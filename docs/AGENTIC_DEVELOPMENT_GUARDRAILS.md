# Agentic Development Guardrails

Date: 2026-04-01

This document defines how future agentic development should stay aligned with architecture and design system goals.

## Rule Files

- `.cursor/rules/architecture-design-system-guardrails.mdc`
- `.cursor/rules/typescript.mdc`
- Existing rule context in `.cursor/rules/contribution.mdc`, `.cursor/rules/graphql.mdc`, and `AGENTS.md`

## Skill Files

- `.cursor/skills/ui_architecture_enforcement/SKILL.md`

## Policy Baseline

1. No new barrel exports.
2. No new components in legacy `src/components/*`.
3. No new module/shared imports from legacy `@/components/*`.
4. Raw gradients are acceptable when intentional.
5. Box shadows should follow design theme standards (no new one-off literals in feature UI).
6. Prefer punctuation outside `t()` where practical (soft preference).
7. Prefer `react-icons/pi` for new icon additions, while keeping existing non-`pi` usage unless functionally touched.

## Change Decision Gate

For each UI/architecture change, decide in this order:

1. Reuse existing shared component/token if available.
2. If the pattern repeats, update design system/shared layer first.
3. Keep local only when intentionally one-off.

## PR Review Gate

Every PR that touches UI should include checks for:

1. Component placement: module-local vs shared.
2. Legacy import usage from `@/components/*`.
3. New barrel file additions.
4. New raw `boxShadow` literals.
5. GraphQL hook source (`@/types` generated hooks vs Apollo base hooks).

## Operating Principle

Before implementing a local UI pattern, ask:

- Does this deviate from the design system?
- If yes, should we update the design system/theme/shared tokens first?

Default to design-system-first when the pattern is reusable.
