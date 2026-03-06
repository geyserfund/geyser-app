# SSR + Apollo Cache Migration Plan (Minimal, Production-Oriented)

## Related docs

- `docs/PLAN_SSR_FETCHABLE_PUBLIC_DATA.md`
- `docs/PLAN_SSR_SEO_HEAD_ARCHITECTURE.md`
- `docs/SEO_METADATA_STANDARD.md`

## Goals and constraints

- Replace `prerender-node` with native server-side rendering for public pages.
- Keep private and transactional flows client-rendered:
  - Funding / refund
  - Launch / dashboard / creator flows
  - Auth-sensitive profile settings routes
- Implement Apollo server-side data rendering in the first phase (no skeleton-first SSR target for public pages).
- Add minimal request caching for SSR HTML and server-side GraphQL queries.
- Do not migrate to React Router loaders in the first phase.
- Preserve current module boundaries and architecture from `docs/ARCHITECTURE.md`:
  - shared SSR plumbing in `src/shared` / `src/config`
  - domain behavior stays inside `src/modules/*`

## Current baseline (what changes)

- Current runtime is CSR with static asset serving plus `prerender-node` middleware in `server.ts`.
- Route graph is centralized in `src/config/routes/routes.tsx` and route groups in `src/config/routes/routeGroups.ts`.
- Apollo usage is hook-driven across modules (`@/types` generated hooks), with a global client created in `src/config/apollo-client/apolloClient.ts`.

## Target rendering model

- SSR (public pages only):
  - Landing and discovery pages
  - Public project pages (`/project/:projectName` and public subviews)
  - Other public/static views (heroes, guardians, impact-funds, manifesto)
- CSR-only:
  - Funding/refund routes
  - Dashboard/editor/launch/private routes

## Implementation steps

1. Shared SSR route policy

- Add a shared SSR policy utility in `src/config/routes` that classifies routes as:
  - `ssr-public`
  - `csr-only`
- Reuse existing route groups from `routeGroups.ts` to avoid route duplication.
- Include explicit denylist for funding/refund/launch/dashboard/private flows.

2. Router and entrypoint refactor (minimal)

- Keep existing route object tree as the source of truth.
- Introduce client/server entry points:
  - `src/entry-client.tsx` for hydrate/render
  - `src/entry-server.tsx` for server render
- Keep existing lazy route modules and existing component-level data hooks.

3. Apollo SSR setup (required in phase 1)

- Refactor Apollo client config into factories:
  - Browser factory: current behavior (http + ws split, hydrated cache)
  - Server factory: `ssrMode: true`, http-only, request-scoped headers/cookies
- Add request-scoped Apollo provider for SSR renders.
- Implement prepass rendering:
  - render app on server with Apollo
  - wait for GraphQL queries required by rendered tree
  - extract Apollo cache
  - inject `__APOLLO_STATE__` into HTML
  - hydrate that cache in `entry-client`

4. Server replacement

- Replace prerender middleware in `server.ts` with SSR request handling:
  - Match request URL against SSR policy
  - `csr-only` routes -> return CSR shell
  - `ssr-public` routes -> run SSR render + Apollo cache injection
- Keep static asset serving behavior and existing cache-control behavior for SW/meta assets.

5. Minimal caching layer

- Add in-process TTL caches in server runtime (no Redis dependency in phase 1).

- HTML SSR cache:

  - key: `url + locale + anonymous`
  - cache only anonymous public SSR responses
  - TTL: 60 seconds
  - stale window: 300 seconds (stale-while-revalidate behavior)

- GraphQL SSR query cache:

  - key: `operationName + variables + locale`
  - cache only query operations (no mutations/subscriptions)
  - cache only anonymous requests
  - TTL: 15-30 seconds

- Cache headers:
  - anonymous SSR public pages: `public, s-maxage=60, stale-while-revalidate=300`
  - authenticated or private/CSR routes: `private, no-store`

6. SSR-safety hardening (shared/public paths only)

- Patch shared browser globals to be server-safe (`window`, `document`, `localStorage`, `navigator` guards).
- Priority files:
  - `src/config/Head.tsx`
  - `src/config/domain.ts`
  - `src/config/apollo-client/apolloClient.ts` (after factory split)
  - `src/AppLayout.tsx`
  - public project share components/hooks under `src/modules/project/pages/projectView/**`

7. Build + CI/CD updates

- Update build scripts for dual output:
  - client bundle
  - server SSR bundle
- Update Docker image build/start to run SSR server artifact.
- Update Cloud Build configs (staging + prod):
  - remove prerender dependency/secrets from deploy flow
  - inject SSR env vars (feature flag + cache TTL values)
- Keep current Cloud Run deployment model.

8. Rollout strategy

- Add `SSR_ENABLED` feature flag:
  - staging on by default
  - production canary rollout
- Validate:
  - HTML source contains real content + SEO tags for public pages
  - hydration has no critical mismatch errors
  - funding/refund/private flows remain unchanged
  - cache hit rate and TTFB are acceptable

## Minimal architecture-aligned file placement

- `src/config/routes/*`: SSR route policy and route matching helpers
- `src/config/apollo-client/*`: Apollo server/browser client factories
- `src/shared/ssr/*`: SSR rendering helpers, cache utilities, serialization helpers
- `server.ts` (or `src/server/*` if extracted): request pipeline orchestration
- Domain modules in `src/modules/*`: only SSR-safety fixes where needed; no domain restructuring in phase 1

## Out of scope for phase 1

- React Router loader migration
- Redis/distributed cache
- Full streaming SSR optimization
- Rewriting module data access patterns

## Acceptance criteria

- `prerender-node` is removed from runtime path.
- Public routes render server-side with Apollo data present on first response.
- CSR-only routes remain CSR and behavior-compatible with current flow.
- Minimal SSR HTML cache and SSR GraphQL query cache are active.
- CI/CD produces and deploys SSR-capable container successfully.
