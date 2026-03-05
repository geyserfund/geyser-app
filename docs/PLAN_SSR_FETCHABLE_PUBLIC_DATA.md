# SSR Fetchable Public Data Plan (Phase 2)

## Related docs

- `docs/PLAN_SSR_APOLLO_CACHE_MIGRATION.md`
- `docs/PLAN_SSR_SEO_HEAD_ARCHITECTURE.md`
- `docs/SEO_METADATA_STANDARD.md`

## Objective

Make currently non-SSR-fetchable public page data SSR-fetchable using the existing React Router v7 + Apollo SSR pipeline, without changing architecture or functional behavior.

## Implementation Status (March 2026)

- Case A (project root bootstrap) is now partially implemented: `useProjectAPI` includes a render-time `useProjectPageBodyQuery` path while preserving imperative `queryProject.execute`.
- This unblocks SSR fetchability for project context-dependent metadata and content on public project routes.
- Remaining cases in this document are still valid follow-up scope.

This plan explicitly follows `docs/ARCHITECTURE.md`:
- keep domain logic in `src/modules/*/hooks` and `src/modules/*/API`
- keep module state in Jotai atoms
- keep UI components focused on rendering
- no loader migration in this phase

## Scope

In scope:
- Public discovery views with data currently gated by client-only patterns
- Public project views that still rely on `useLazyQuery + useEffect` bootstrapping
- Post/reward/goal public project subviews where first render is currently partial/skeleton

Out of scope:
- Funding/refund/private flows
- Loader migration
- Re-architecture of module boundaries
- Behavior changes in navigation, redirects, or atom semantics

## Definition: “SSR-fetchable”

A page is SSR-fetchable when Apollo queries required for initial render execute during server render (`getDataFromTree`) and are present in server HTML + `__APOLLO_STATE__`.

In this codebase, this means:
- preferred: `useGeneratedQuery(...)` in render path
- avoid for initial data: `useGeneratedLazyQuery(...)` triggered from `useEffect(...)`

## Migration patterns (minimal / architecture-safe)

1. `Lazy + effect` -> `Query hook` inside existing module API hook.
- Keep the API hook file and atom updates where they are.
- Keep existing fetch policies and callbacks.
- Keep returned API shape by exposing `execute` via `refetch`.

2. Preserve Jotai data contract.
- Continue using `onCompleted` to write to atoms.
- Do not move atom ownership from module `state/*`.

3. Make dependent query chains render-driven.
- Replace local `loading` state toggles used only to unblock query `skip`.
- Use upstream query `loading/data` directly for `skip` and derived vars.

4. Keep private/auth-sensitive fetches client-first when needed.
- If data depends on auth/cookies and SSR server intentionally omits auth headers, keep behavior as-is unless explicitly promoted later.

## Case-by-case plan

### Case A: Project root bootstrap (highest impact)

Routes:
- `/project/:projectName`
- `/project/:projectName/draft`
- `/project/:projectName/prelaunch`
- public subviews relying on project context

Current blocker:
- Project base data loaded via lazy query invoked in `useEffect`.

Files:
- `src/modules/project/API/useProjectAPI.ts`
- `src/modules/project/context/ProjectProvider.tsx`

Plan:
- Replace `useProjectPageBodyLazyQuery` with `useProjectPageBodyQuery` inside `useProjectAPI`.
- Preserve:
  - `onCompleted` atom normalization/update behavior
  - `onError` capture + not-found navigation
  - existing returned `queryProject.execute` by wiring to `refetch`.

Expected result:
- Project context data available during SSR render pass, enabling downstream project sections to render real content.

---

### Case B: Project posts list bootstrap

Routes:
- `/project/:projectName` (posts section)
- `/project/:projectName/posts`

Current blocker:
- posts/unpublished posts use lazy queries executed in `useEffect`.

Files:
- `src/modules/project/API/useProjectPostsAPI.ts`
- `src/modules/project/pages/projectView/views/body/sections/Posts.tsx`
- `src/modules/project/pages/projectView/views/posts/ProjectPosts.tsx`

Plan:
- Convert `useProjectPostsLazyQuery` and `useProjectUnplublishedPostsLazyQuery` to query hooks with `skip` based on project readiness and owner state.
- Keep atom writes (`postsAtom`, `unpublishedPostsAtom`) and initial-load atoms unchanged.
- Keep public behavior (sorting/filtering/redirects) unchanged.

Expected result:
- Post cards for public project pages can render in SSR HTML when data exists.

---

### Case C: Project rewards bootstrap

Routes:
- `/project/:projectName` (rewards section)
- `/project/:projectName/rewards`

Current blocker:
- rewards loaded lazily in effect.

Files:
- `src/modules/project/API/useProjectRewardsAPI.ts`
- `src/modules/project/pages/projectView/views/body/sections/Rewards.tsx`
- `src/modules/project/pages/projectView/views/rewards/ProjectRewards.tsx`

Plan:
- Convert to render-time query hook with existing `network-only` policy and same atom updates.
- Preserve hidden/active reward behavior and owner-only branches.

Expected result:
- Reward content can be fully SSR-rendered for public users.

---

### Case D: Project goals bootstrap

Routes:
- `/project/:projectName` (goals section)
- `/project/:projectName/goals`

Current blocker:
- in-progress/completed goals loaded lazily in effect.

Files:
- `src/modules/project/API/useProjectGoalsAPI.ts`
- `src/modules/project/pages/projectView/views/goals/common/RenderGoals.tsx`

Plan:
- Convert both lazy queries to render-time query hooks with current fetch policies.
- Preserve existing atom updates and reorder behavior.
- Keep `onNoGoals` redirect behavior unchanged.

Expected result:
- Goal lists can be server-rendered when data exists.

---

### Case E: Project grant applications for contribute CTA context

Routes:
- `/project/:projectName` where contribute button needs grant application context

Current blocker:
- grant applications loaded lazily in effect.

Files:
- `src/modules/project/API/useProjectGrantApplicationsAPI.ts`
- `src/modules/project/pages/projectView/views/body/components/ContributeButton.tsx`

Plan:
- Convert to query hook with current `cache-first` policy and partial project update atom behavior.
- Keep voting grant CTA behavior unchanged.

Expected result:
- CTA-related grant metadata can be present at SSR time.

---

### Case F: Project subscriptions bootstrap (public right rail dependencies)

Routes:
- `/project/:projectName` where contribution summary may depend on subscription plans

Current blocker:
- subscriptions loaded lazily in effect.

Files:
- `src/modules/project/API/useProjectSubscriptionsAPI.ts`
- `src/modules/project/context/FundingProvider.tsx`

Plan:
- Convert to render-time query hook, keep initial-load atom behavior.
- Keep existing funding provider structure.

Expected result:
- subscription plan data available earlier in SSR/hydration path.

---

### Case G: Post detail page direct fetch

Route:
- `/project/:projectName/posts/:postId`

Current blocker:
- `PostView` loads post using `useProjectPostLazyQuery` inside `useEffect`.

File:
- `src/modules/project/pages/projectView/views/posts/PostView.tsx`

Plan:
- Replace with render-time generated query hook using `skip: !postId`.
- Preserve loading skeleton and error notification behavior.

Expected result:
- Post title/description/content can be server-rendered.

---

### Case H: “In your region” discovery views (query chaining)

Routes:
- `/campaigns/region`
- `/fundraisers/region`
- landing section “Projects in your region”

Current blocker:
- local component `loading` state is used to gate second query (`skip`), making SSR dependency chain brittle.

Files:
- `src/modules/discovery/pages/landing/views/navView/campaigns/views/InYourRegionCampaigns.tsx`
- `src/modules/discovery/pages/landing/views/navView/fundraisers/views/InYourRegionFundraisers.tsx`
- `src/modules/discovery/pages/landing/views/mainView/defaultView/sections/ProjectsInYourRegion.tsx`

Plan:
- Remove client-only toggle state.
- Derive second query readiness directly from first query (`useGetUserIpCountryQuery`) loading/data.
- Keep pagination and UI behavior unchanged.

Expected result:
- Region-based lists become deterministically SSR-fetchable when country data resolves.

---

### Case I: Project wallet bootstrap in public project context

Routes:
- `/project/:projectName` and subroutes rendered under project context

Current blocker:
- wallet bootstrap uses lazy query triggered by `useEffect` in project API layer.

Files:
- `src/modules/project/API/useProjectWalletAPI.ts`
- `src/modules/project/Project.tsx`

Plan:
- Keep lazy query for imperative `execute` callers.
- Add render-time `useProjectPageWalletsQuery` with existing fetch policy, callbacks, and wallet atom updates.
- Remove mount `useEffect` trigger.

Expected result:
- wallet-dependent public project UI can participate in SSR fetch pass without changing component architecture.

## Implementation sequence (small, safe PRs)

1. PR-1: Case A + Case G
- project root query bootstrapping + post detail page

2. PR-2: Case B + Case C + Case D + Case F
- posts/rewards/goals/subscriptions API hook conversions

3. PR-3: Case E + Case H
- grant application CTA context + discovery region query chaining

4. PR-4: Case I
- wallet bootstrap conversion in project API

## Validation checklist per PR

- Type safety:
  - `yarn exec tsc --noEmit`
- Build:
  - `yarn build`
- SSR output checks (with `SSR_ENABLED=true`):
  - `/project/:projectName` returns project title/section content in HTML source
  - `/project/:projectName/posts/:postId` returns post content in HTML source
  - region pages render list content server-side when country resolves
- Regression checks:
  - funding/refund routes unchanged (still CSR-only)
  - redirects and existing toast/error behavior unchanged

## Risks and mitigations

1. Risk: duplicate atom writes between old execute paths and new query hooks
- Mitigation: keep initial-load atoms and `skip` conditions explicit; keep one authoritative onCompleted path.

2. Risk: auth-dependent query behavior differences on server
- Mitigation: only target public data in this phase; preserve private data client behavior.

3. Risk: hydration mismatch from timing-sensitive UI
- Mitigation: keep render conditions and fallback states unchanged; only change fetch trigger location.

## Deliverable

After this plan, public pages that currently render skeleton/partial content due client-only lazy bootstrapping should become SSR-fetchable while preserving current module architecture and UX behavior.
