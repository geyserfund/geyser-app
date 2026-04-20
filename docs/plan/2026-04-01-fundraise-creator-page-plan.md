# Fundraise Nav + Creator Page Plan

Date: 2026-04-01
Status: draft

## Goal
Implement a new `Fundraise` dropdown in the top navigation (replacing `Impact`) and launch a new Creator landing page at `/creator` (`geyser.fund/creator`) inside the Discovery module, while preserving the existing global top and bottom bars.

## What Was Audited
- Current desktop nav: `src/modules/navigation/platformNavBar/components/LandingDesktopNav.tsx`
- Current top bar shell: `src/modules/navigation/platformNavBar/PlatformNavBar.tsx`
- Current discovery layout + bottom nav: `src/modules/discovery/Discovery.tsx`, `src/modules/navigation/discoveryNav/DiscoveryBottomNav.tsx`
- Routing/constants:
  - `src/shared/constants/config/routerPaths.ts`
  - `src/config/routes/routes.tsx`
  - `src/config/routes/routeGroups.ts`
  - `src/modules/discovery/index.ts`
- Imported design source: `Geyser UI Implementation Spec`
  - Keep section content from `src/app/components/geyser/*Section.tsx`
  - Do not port `Navbar.tsx` and `Footer.tsx`
  - Do not port generated UI boilerplate in `src/app/components/ui/*`

## Scope
- Replace desktop nav `Impact` button with `Fundraise` dropdown.
- Reuse/extract the existing `Donate` dropdown UI into a reusable component and use it for both `Donate` and `Fundraise`.
- Add a new Discovery page: `/creator`.
- Build the Creator page with Chakra + existing project primitives and static data.
- Keep existing platform top/bottom bars; do not import spec bars.
- Optionally make top nav transparent on `/creator` if needed for hero treatment.

## Out Of Scope (for this change)
- No GraphQL/API wiring (static data only).
- No net-new design system package adoption (Radix/Tailwind/MUI/lucide from spec).
- No mobile bottom-nav IA changes unless explicitly requested.

## Routing Plan
1. Add a new route key in `routerPaths`:
- `discoveryCreator: () => '/creator'` (reusing `PathName.creator`).

2. Add the route to Discovery route groups:
- Append `getPath('discoveryCreator')` in `src/config/routes/routeGroups.ts` `discoveryRoutes`.

3. Register route in main router under Discovery parent:
- Add child route in `src/config/routes/routes.tsx` near other Discovery static pages:
  - `path: getPath('discoveryCreator')`
  - lazy-load `CreatorPage` from Discovery module.

4. Export page from Discovery module:
- `src/modules/discovery/index.ts` exports `CreatorPage`.

## Nav Refactor Plan
### A. Extract reusable dropdown component
Create:
- `src/modules/navigation/platformNavBar/components/NavDropdownMenu.tsx` (or similar)

Responsibilities:
- Render `Menu` trigger button (`Donate`/`Fundraise`) with shared styling.
- Render two-column menu content with title, description, optional badge, disabled state, and optional CTA row/button styling.
- Accept typed `items` config.

Why:
- Removes duplicate styling logic.
- Enables the new `Fundraise` dropdown while preserving current `Donate` behavior.

### B. Update desktop nav composition
Edit:
- `src/modules/navigation/platformNavBar/components/LandingDesktopNav.tsx`

Changes:
- Replace inline Donate menu markup with reusable dropdown component.
- Remove `Impact` button.
- Add `Fundraise` dropdown with requested entries:
  - `How to raise funds on Geyser`
  - `Fundraising Categories`
  - `Launch Now` (prominent button row)
  - `Fundraising tips`
  - `Success Stories`
  - `Funding mechanisms`
- Keep `Earn`, `News`, and search behavior unchanged.

### C. Destination mapping (proposed default)
- `How to raise funds on Geyser` -> `/creator`
- `Fundraising Categories` -> `/creator#fundraising-categories`
- `Launch Now` -> `/launch/start`
- `Fundraising tips` -> `/creator#fundraising-tips`
- `Success Stories` -> `/creator#success-stories`
- `Funding mechanisms` -> `/creator#funding-mechanisms`

This keeps IA coherent until dedicated standalone pages are defined.

## Creator Page Implementation Plan
### Folder structure
Create:
- `src/modules/discovery/pages/creator/CreatorPage.tsx`
- `src/modules/discovery/pages/creator/constants.ts`
- `src/modules/discovery/pages/creator/components/`
- `src/modules/discovery/pages/creator/components/CreatorHeroSection.tsx`
- `src/modules/discovery/pages/creator/components/CreatorWelcomeSection.tsx`
- `src/modules/discovery/pages/creator/components/CreatorTypesSection.tsx`
- `src/modules/discovery/pages/creator/components/CreatorCommunitySection.tsx`
- `src/modules/discovery/pages/creator/components/CreatorSuccessStoriesSection.tsx`
- `src/modules/discovery/pages/creator/components/CreatorPossibilitySection.tsx`
- `src/modules/discovery/pages/creator/components/CreatorFinalCtaSection.tsx`
- `src/modules/discovery/pages/creator/components/CreatorSectionContainer.tsx` (shared section shell, if useful)

### Section mapping from imported spec
Port the design intent (not raw code) from:
- `HeroSection.tsx`
- `WelcomeSection.tsx`
- `CreatorTypesSection.tsx`
- `CommunitySection.tsx`
- `SuccessStoriesSection.tsx`
- `PossibilitySection.tsx`
- `FinalCTASection.tsx`

Do not port:
- `Navbar.tsx`
- `Footer.tsx`
- `src/app/components/ui/*`
- Tailwind/token CSS files from spec.

### Page composition
`CreatorPage.tsx` should:
- Render `Head` metadata for SEO.
- Use Discovery page width conventions (`dimensions.maxWidth`, `standardPadding`) where appropriate.
- Stack sections in the same narrative order.
- Provide section IDs used by Fundraise menu anchors.
- Use static data from `constants.ts`.

### UI/data conventions
- Use Chakra primitives + existing typography components (`Body`, `H2`, etc.) where suitable.
- Use `useColorModeValue(...)` and existing theme tokens; avoid hardcoded light-mode backgrounds.
- Keep `t(...)` usage inside component scope or `useMemo` for translated arrays.
- Add localized `aria-label` on icon-only interactive elements.
- Keep one-line JSDoc on exported non-trivial components.

## Top Bar Transparency (Conditional)
If visual QA shows the hero needs full-bleed overlap under nav:
1. Add a creator-route check in nav state (or direct match in `PlatformNavBar.tsx`).
2. Add a creator-specific nav variant:
- Transparent at top.
- Solid background after scroll threshold.
3. If needed, adjust `AppLayout.tsx` top padding for creator route only and compensate with hero internal top spacing.

This will be implemented only if needed after first UI pass.

## Dependency Plan
No new dependencies required.
- Existing stack already supports needed primitives:
  - Chakra UI
  - `framer-motion` (already installed)
  - `react-icons` (already installed)

Spec-only dependencies to avoid importing:
- `motion/react`
- `lucide-react`
- Radix/Tailwind/MUI ecosystem from the generated bundle.

## QA + Verification Plan
1. Static checks
- `yarn exec tsc --noEmit`
- `yarn lint` (or targeted lint on touched files)

2. Behavioral checks
- Desktop nav:
  - `Impact` removed.
  - `Fundraise` dropdown appears and matches Donate interaction style.
  - All dropdown items route correctly.
- Creator page:
  - Accessible at `/creator`.
  - Uses existing global top and bottom bars.
  - No imported spec navbar/footer appears.
  - Section anchors work.
- Theme/responsive:
  - Verify light/dark mode parity.
  - Verify at `base`, `lg`, `xl` breakpoints.

3. Regression checks
- Existing `Donate` dropdown behavior unchanged.
- `Earn`, `News`, search still functional.
- Discovery routing still recognized as platform routes.

## Risks / Notes
- Link destinations for 5 of 6 Fundraise items are not explicitly defined; using creator-page anchors is the safest default.
- If transparent nav is enabled, route-scoped spacing changes can affect other pages if not isolated.
- Imported Figma code includes many inline styles; conversion to Chakra/theme tokens should be incremental to avoid token drift.

## Crucial Questions
1. For Fundraise dropdown items 2/4/5/6, do you want anchor links on `/creator` (proposed), or separate pages/external guide links?
2. Should `Launch Now` always go to `/launch/start`, or use the stricter gated flow (`launchProjectDetails`) from project-creation utilities?
3. Do you also want `Impact` replaced in the mobile Discovery bottom nav, or desktop top nav only?
4. Should we force transparent top nav on `/creator`, or ship the page first and only add transparency if you want a stronger hero overlay after review?
