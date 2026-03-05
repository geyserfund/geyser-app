# Public SEO Direct-Query Migration Plan

## Goal

Make SEO metadata for public routes deterministic in SSR by deriving head values from route/query data directly, not from Jotai timing.

This keeps current architecture and behavior:
- no loader migration
- no funding/refund/private flow behavior change
- no domain ownership changes

## Implementation status (March 2026)

- Phase 1 started and partially implemented:
  - added direct-query project SEO hook: `src/modules/project/hooks/useProjectSeoData.ts`
  - wired project head metadata in `ProjectLayout` to direct query descriptor values
  - wired post/reward head metadata to use direct query project fallback values
- Baseline route-level `Head` coverage added for previously uncovered public views:
  - discovery landing/category/campaigns/fundraisers/shops/activity
  - heroes pages and project leaderboard
  - discovery leaderboard
  - manifesto
  - badges
- Remaining phases below are still required for full public-route SEO coverage.

## Why this plan

Current SSR head injection works, but some route metadata still depends on state that is populated through callback/effect timing. Social crawlers can still see default metadata when route-specific metadata is late.

## Route coverage audit

## A) Public routes with route-specific `Head` already present

- Project:
  - `/project/:projectName*` via `src/modules/project/layouts/ProjectLayout.tsx`
  - `/project/:projectName/posts/:postId` via `src/modules/project/pages/projectView/views/posts/PostView.tsx`
  - `/project/:projectName/rewards/:rewardUUID` via `src/modules/project/pages/projectView/views/rewards/RewardView.tsx`
- Grants:
  - `/grants` via `src/modules/grants/pages/grantsMainPage/GrantsMainPage.tsx`
  - `/grants/:grantId` via `src/modules/grants/pages/grantsIndividualPage/GrantPage.tsx`
- Impact Funds:
  - `/impact-funds` via `src/modules/impactFunds/pages/ImpactFundsMainPage.tsx`
  - `/impact-funds/:impactFundName` via `src/modules/impactFunds/pages/ImpactFundDetailPage.tsx`
- Guardians:
  - `/guardians` via `src/modules/guardians/pages/main/GuardiansMainPage.tsx`
- Giveaway:
  - giveaway legal/public pages under `src/modules/discovery/pages/giveaway/*`

## B) Public routes currently missing route-specific SEO head (remaining)

- Public profile pages (if included in SEO scope):
  - `src/modules/profile/pages/profilePage/Profile.tsx`
  - `src/modules/profile/pages/profilePage/views/*`
- Hero profile pages (if included in SEO scope):
  - route-level hero profile views currently served through profile module pages above
- Any future public route added without explicit `Head`/descriptor integration.

## C) Routes with SEO head that still need hardening

- `ProjectLayout` / `PostView` / `RewardView` are now descriptor-driven from direct query values, but still need:
  - shared `SeoDescriptor`/`SeoHead` standardization
  - final fallback normalization and route-level tests
  - optional json-ld sourcing cleanup where project atom fallback remains acceptable today

## Target pattern

Add a shared SEO descriptor path and consume direct query/route values for head tags:

1. Shared contract
- `src/shared/seo/types.ts`
  - `SeoDescriptor { title, description, image, url, type, imageAlt?, jsonLd? }`

2. Shared renderer
- `src/shared/seo/SeoHead.tsx`
  - thin wrapper to map descriptor -> existing `Head`

3. Module builders/hooks (query-first)
- `src/modules/project/tools/seo/*`
- `src/modules/discovery/tools/seo/*`
- `src/modules/guardians/tools/seo/*`
- `src/modules/general/badges/tools/seo/*`

Use route params + direct Apollo query data to build descriptor.
Do not make SEO descriptor depend on Jotai state population.

## Implementation phases

## Phase 1: Project routes (highest priority)

1. Introduce `useProjectSeoData` (direct query + params).
2. Use it in `ProjectLayout` for `/project/:projectName*`.
3. Update `PostView` descriptor path:
- canonical built from route params
- image fallback deterministic without Jotai dependency where possible
4. Update `RewardView` descriptor path:
- add explicit canonical URL
- set `type: article` (or agreed type)

Outcome:
- shared project links produce deterministic SSR metadata for crawlers.

## Phase 2: Discovery surface

1. Add static/deterministic descriptors for:
- landing default
- category view
- campaign/fundraiser/products shells
2. Ensure each discovery shell emits route-specific canonical and description.

Outcome:
- discovery public pages stop inheriting only global app defaults.

## Phase 3: Heroes + leaderboard + manifesto + badges

1. Add descriptors to heroes pages and project leaderboard page.
2. Add descriptor to discovery leaderboard.
3. Add descriptor to manifesto and badges page.

Outcome:
- all high-traffic public views have route-level SEO metadata.

## Phase 4: Hardening and consistency

1. Normalize fallback chains (entity -> module default -> global default).
2. Ensure all descriptor routes include canonical URL.
3. Add `twitter:title`, `twitter:description`, `twitter:image` parity checks.
4. Add test checklist for representative public routes.

## Validation checklist

For each migrated route:

1. `view-source` includes route-specific:
- `<title>`
- `meta[name="description"]`
- `og:title`, `og:description`, `og:image`, `og:url`
- `twitter:title`, `twitter:description`, `twitter:image`
- canonical link
2. Discord preview resolves route-specific title/description/image.
3. CSR-only routes remain unchanged.

## Out of scope

- React Router loader/meta migration
- bot-only rendering branch logic
- moving existing business state ownership away from Jotai
