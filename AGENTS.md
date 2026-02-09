# Agent Notes

## Internationalization

- For translatable strings with dynamic values, never use template literals in `t(...)`; use interpolation (`t('... {{var}} ...', { var: value })`) or `Trans`.
- When writing texts inside `t()` function, make sure to keep end punctuations like `:`,`?`,  outside the function so that the translation itself is clean text.

## Commit Messages

- Use conventional commits in `type(scope): subject` format with lowercase `type`/`scope` and no trailing period in `subject`.

## GraphQL / Codegen

- Use generated GraphQL hooks over raw `useMutation` / `useQuery` in feature code.
- Run `docker exec geyser-app yarn codegen` and use generated types/hooks from `@/types`.
- After codegen, run `yarn exec tsc --noEmit`; update typed mocks if schema fields changed.

## Money Precision

- Never use `number` for wei/uint256 values; use `bigint` end-to-end.
