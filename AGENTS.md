# Agent Notes

## Governance Baseline (2026-04-01)

- Treat these as the active source of truth for architecture and UI consistency:
  - `docs/ARCHITECTURE.md`
  - `docs/AGENTIC_DEVELOPMENT_GUARDRAILS.md`
  - `.cursor/rules/architecture-design-system-guardrails.mdc`
  - `.cursor/rules/contribution.mdc`
  - `.cursor/rules/graphql.mdc`
  - `.cursor/rules/typescript.mdc`
- Before implementation, load and follow applicable `.cursor/rules/*.mdc` files.
- For UI/architecture tasks, load and follow `.cursor/skills/ui_architecture_enforcement/SKILL.md`.
- Intentional module domains include: `auth`, `discovery`, `embed`, `general`, `grants`, `guardians`, `hackathon`, `impactFunds`, `navigation`, `notification`, `profile`, `project`, `widget`.
- Hard rule: do not create new barrel exports (`index.ts` / `index.tsx`).
- Hard rule: do not add new components to legacy `src/components/*`; use `src/modules/*` or `src/shared/*`.
- Hard rule: for new module/shared work, avoid new imports from legacy `@/components/*`.
- Gradients: raw gradients are acceptable when intentional.
- Shadows: prefer theme/shared shadow tokens and avoid new one-off `boxShadow` literals in feature UI.
- Existing non-`pi` icon usage is acceptable; prefer `react-icons/pi` for new icon additions.
- Payment behavior currently accepted as-is unless explicitly requested otherwise:
  - `hasFiatPaymentMethodAtom` current behavior remains unchanged.
  - Apple Pay capability check with `ApplePaySession.canMakePayments()` remains unchanged.

## Local Development

- When verifying the app in a browser, use `https://dev.geyser.fund` instead of `http://localhost:3000` so frontend data loads correctly from the dev backend.

## Internationalization

- For translatable strings with dynamic values, never use template literals in `t(...)`; use interpolation (`t('... {{var}} ...', { var: value })`) or `Trans`.
- Prefer keeping end punctuations like `:`,`?` outside `t()` so that translation keys stay clean text (soft preference, non-blocking).
- Prefer `import { t } from 'i18next'` for simple static translations (instead of `useTranslation`), and use explicit `.ts`/`.tsx` extensions on local alias imports when lint requires it.
- If translated arrays/objects are used in rendered UI, build them inside the component or a `useMemo`; do not call `t()` at module scope for UI content that must react to language changes.
- Do not split one user-visible sentence across multiple JSX nodes when it should be translated as a whole; use a single `t(...)` call with interpolation for dynamic parts (for example project name and creator metadata lines).
- Do not wrap translated UI content in `useMemo` with an empty dependency array; either build it inline or include active language in dependencies.
- Icon-only interactive elements must include a localized `aria-label` (for example, `aria-label={t('Close')}`).
- For dates/times coming from API data, interpolate formatted values in `t(...)`; do not hardcode date text in copy.

## Commit Messages

- Use conventional commits in `type(scope): subject` format with lowercase `type`/`scope` and no trailing period in `subject`.

## GraphQL / Codegen

- Always import the corresponding auto-generated GraphQL hook from `@/types/index.ts` (via `@/types`).
- Do not call Apollo base hooks (`useQuery`, `useMutation`) directly in feature code; use GraphQL Code Generator hooks only.
- Use generated GraphQL hooks over raw `useMutation` / `useQuery` in feature code.
- For sensitive fields, keep separate public and creator-only fragments/queries, and default to the public variant unless creator-only data is required.
- Do not duplicate field selections inside GraphQL fragments/queries.
- Run `docker exec geyser-app yarn codegen` and use generated types/hooks from `@/types`.
- After codegen, run `yarn exec tsc --noEmit`; update typed mocks if schema fields changed.

## Loaders / Imports

- In `*loader*.ts` files, keep dynamic imports plain (`import('./index.ts')`); do not add webpack-specific magic comments such as `webpackChunkName`.
- Use `import type` for type-only imports.
- Use explicit `.ts`/`.tsx` extensions on local alias and relative imports when lint/CI requires it.
- Use direct file imports instead of barrels for new work.

## Dark Mode Standard

- Do not hardcode surface/background colors like `bg="white"` or `bg="gray.50"` in feature UI.
- Use `useColorModeValue(...)` or semantic tokens for all container/card/surface backgrounds.
- For paired surfaces, prefer a primary surface token (e.g., `white`/`gray.800`) and a muted surface token (e.g., `gray.50`/`gray.700`) defined once per component.
- Raw gradients are allowed when intentional.
- For shadows, badge fills/text, borders, overlays, and CTA hover/active states, avoid one-off raw hex/rgba values when an existing palette token or `useColorModeValue(...)` pair already covers the pattern.
- Respect the existing dark mode design system: do not invent local one-off colors for borders, dividers, badges, shadows, or states when an existing semantic token or established `useColorModeValue(...)` pair already covers that UI pattern.
- Validate palette token names against `src/shared/styles/colors.ts` before introducing new ones; do not use non-existent aliases (for example `primary1Alpha.*`), use the defined token namespace (for example `primaryAlpha.*`).
- When a reviewer flags a theme deviation, audit the whole component in both light and dark mode instead of fixing only the commented line. Check cards, pills, promotional banners, nav buttons, and any “special” surfaces for token drift.
- For theme-heavy components, define the light/dark tokens once near the top of the component and reuse them across all related elements so card/button states stay visually consistent.

## Query & Notifications

- For page-level GraphQL queries, handle `loading` and `error` explicitly before rendering data-dependent UI; do not rely on `return null` for in-flight/error states.
- Apply the same `loading`/`error` handling standard to section-level data-dependent queries and provide a clear retry path where appropriate.
- Do not silently fall back to unrelated/global data when a scoped lookup fails (for example, region-specific discovery pages). Block rendering of the scoped result and show an explicit retry/error state instead.
- Prefer project `useNotification` over raw Chakra `useToast` in feature code.
- Never add the full object returned by `useNotification()` to `useEffect` dependencies. Ignore eslint warning for this specific case.
- Prefer shared typography components (`H2`, `Body`, etc.) over raw Chakra `Text` for user-facing page copy.

## Routing & Safety

- Guard nullable objects before property access (`project?.id`, etc.) and exit early when required data is missing.
- For route detection, prefer exact segment checks (`pathname.split('/')`) over broad substring checks like `pathname.includes(...)`.
- Treat `URLSearchParams` as immutable in React flows: clone before edits (`new URLSearchParams(searchParams)`), then write back.

## Component Docs

- Add a one-line JSDoc to exported non-trivial components/hooks, including `@param` when it clarifies props intent.

## Data Normalization

- When deduplicating/sorting API-provided category/tag strings, normalize with canonical lowercase keys and use case-insensitive lookups.

## Money Precision

- Never use `number` for wei/uint256 values; use `bigint` end-to-end.
- For satoshi/ID GraphQL scalar values, use `string`/`bigint`; do not use `number`.

## Deployment

- For production deployment prep, follow `docs/DEPLOYMENT.md`.
- For release prep tasks, load and follow `.cursor/skills/release_prep/SKILL.md`.
