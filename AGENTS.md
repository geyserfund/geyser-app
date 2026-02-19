# Agent Notes

## Internationalization

- For translatable strings with dynamic values, never use template literals in `t(...)`; use interpolation (`t('... {{var}} ...', { var: value })`) or `Trans`.
- When writing texts inside `t()` function, make sure to keep end punctuations like `:`,`?`,  outside the function so that the translation itself is clean text.
- Prefer `import { t } from 'i18next'` for simple static translations (instead of `useTranslation`), and use explicit `.ts`/`.tsx` extensions on local alias imports when lint requires it.

## Commit Messages

- Use conventional commits in `type(scope): subject` format with lowercase `type`/`scope` and no trailing period in `subject`.

## GraphQL / Codegen

- Always import the corresponding auto-generated GraphQL hook from `@/types/index.ts` (via `@/types`).
- Do not call Apollo base hooks (`useQuery`, `useMutation`) directly in feature code; use GraphQL Code Generator hooks only.
- Use generated GraphQL hooks over raw `useMutation` / `useQuery` in feature code.
- Run `docker exec geyser-app yarn codegen` and use generated types/hooks from `@/types`.
- After codegen, run `yarn exec tsc --noEmit`; update typed mocks if schema fields changed.

## Loaders / Imports

- In `*loader*.ts` files, keep dynamic imports plain (`import('./index.ts')`); do not add webpack-specific magic comments such as `webpackChunkName`.

## Dark Mode Standard

- Do not hardcode surface/background colors like `bg="white"` or `bg="gray.50"` in feature UI.
- Use `useColorModeValue(...)` or semantic tokens for all container/card/surface backgrounds.
- For paired surfaces, prefer a primary surface token (e.g., `white`/`gray.800`) and a muted surface token (e.g., `gray.50`/`gray.700`) defined once per component.

## Query & Notifications

- For page-level GraphQL queries, handle `loading` and `error` explicitly before rendering data-dependent UI; do not rely on `return null` for in-flight/error states.
- Prefer project `useNotification` over raw Chakra `useToast` in feature code.
- Prefer shared typography components (`H2`, `Body`, etc.) over raw Chakra `Text` for user-facing page copy.

## Money Precision

- Never use `number` for wei/uint256 values; use `bigint` end-to-end.

## Deployment

- For production deployment prep, follow `docs/DEPLOYMENT.md`.
- Use `yarn version [minor|major|patch]` for version updates.
- Run `yarn changelog` after version updates.
- Create and push the release tag for each version bump (`git tag -a vX.Y.Z <release-commit-sha> -m "Release vX.Y.Z"` and `git push origin vX.Y.Z`) before generating the next release changelog.
- Create the PR from `staging` to `production`.
