# UI Architecture Enforcement Skill

## Purpose

Use this skill when implementing or reviewing UI-related changes so architecture, design-system, and component placement stay consistent.

## When To Use

Apply this skill for any task that:
- Adds or moves components.
- Changes colors, shadows, gradients, surfaces, or typography.
- Touches module/shared boundaries.
- Introduces GraphQL queries/mutations used by feature UI.

## Required Inputs

- `docs/ARCHITECTURE.md`
- `docs/AGENTIC_DEVELOPMENT_GUARDRAILS.md`
- `AGENTS.md`
- `.cursor/rules/architecture-design-system-guardrails.mdc`
- `.cursor/rules/contribution.mdc`
- `.cursor/rules/graphql.mdc`
- `.cursor/rules/typescript.mdc`

## Hard Guardrails

1. No new barrel exports (`index.ts` / `index.tsx`).
2. No new components in legacy `src/components/*`.
3. No new module/shared imports from legacy `@/components/*`.
4. No new one-off `boxShadow` literals in feature UI.
5. Use generated GraphQL hooks from `@/types` for feature code.

## Soft Guardrails

1. Keep punctuation outside `t()` where practical.
2. Prefer theme/semantic tokens for color mode behavior.
3. Keep gradients raw only when intentional and local to visual identity.
4. Prefer `react-icons/pi` for new icons, but keep existing non-`pi` imports unless already touching that area.

## Decision Framework: Reuse vs Design-System Update

Before coding, answer in order:

1. Does an existing shared component or token already solve this?
- If yes, reuse it.

2. Is this pattern likely to repeat in 2+ places?
- If yes, add/update shared component or theme token first.

3. Is this a unique one-off visual (campaign/hero art)?
- If yes, local gradient is acceptable.
- Even then, shadows should still use approved shadow tokens/patterns.

## Implementation Checklist

- Place new domain components under `src/modules/<domain>/...`.
- Place cross-domain reusable components under `src/shared/...`.
- Use direct file imports with explicit local extensions when required.
- Validate no new legacy imports were introduced.
- Validate no new barrel files were introduced.
- Validate no raw shadow literals were introduced.

## Review Output Contract

When using this skill in a review, report:

1. New/updated component files and whether placement is correct.
2. Any legacy import paths introduced.
3. Any barrel export introduction.
4. Any raw shadow literals introduced.
5. Whether change should update design system or remain local.

## Escalation Rule

If a required visual pattern cannot be implemented with existing tokens/components, do not create one-off shadow/styling hacks by default. Propose a design-system update path first, then implement feature usage.
