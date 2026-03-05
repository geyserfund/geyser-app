# Agent Notes

## Internationalization

- For translatable strings with dynamic values, never use template literals in `t(...)`; use interpolation (`t('... {{var}} ...', { var: value })`) or `Trans`.
- When writing texts inside `t()` function, make sure to keep end punctuations like `:`,`?`,  outside the function so that the translation itself is clean text.
- Prefer `import { t } from 'i18next'` for simple static translations (instead of `useTranslation`), and use explicit `.ts`/`.tsx` extensions on local alias imports when lint requires it.
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
- Use explicit `.ts`/`.tsx` extensions on local alias and relative imports when lint/CI requires it, and prefer direct file imports over barrels when that avoids ambiguity.

## Dark Mode Standard

- Do not hardcode surface/background colors like `bg="white"` or `bg="gray.50"` in feature UI.
- Use `useColorModeValue(...)` or semantic tokens for all container/card/surface backgrounds.
- For paired surfaces, prefer a primary surface token (e.g., `white`/`gray.800`) and a muted surface token (e.g., `gray.50`/`gray.700`) defined once per component.

## Query & Notifications

- For page-level GraphQL queries, handle `loading` and `error` explicitly before rendering data-dependent UI; do not rely on `return null` for in-flight/error states.
- Apply the same `loading`/`error` handling standard to section-level data-dependent queries and provide a clear retry path where appropriate.
- Prefer project `useNotification` over raw Chakra `useToast` in feature code.
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
- Use `yarn version [minor|major|patch]` for version updates.
- Run `yarn changelog` after version updates.
- Create and push the release tag for each version bump (`git tag -a vX.Y.Z <release-commit-sha> -m "Release vX.Y.Z"` and `git push origin vX.Y.Z`) before generating the next release changelog.
- Create the PR from `staging` to `production`.

## Documentation Discipline (Core Rule)

- For any architectural, infra, SSR/SEO, routing, or data-layer refactor, update docs in the same change set; do not leave documentation as a follow-up task.
- Minimum doc deliverables for non-trivial refactors:
  1. an implementation plan in `docs/PLAN_*.md`
  2. a persistent standard/contract doc when introducing reusable patterns
  3. a concise "what changed" summary for reviewers.
- When user feedback is added directly inside plan docs, incorporate it into the plan text and explicitly summarize deltas in the response.
- Keep linked docs in sync when one changes (for example SEO plan + SEO standard).
