# ADR 0011: Adopt the grassroots brand theme app-wide

## Status

Accepted

## Context

Geyser is pivoting from Bitcoin crowdfunding to grassroots Circular Grants (see `PRODUCT.md`). The previous identity (bright teal primary, white surfaces, Figtree for every role) reads as a crowdfunding startup. A new identity was trialled on the landing page through scoped overrides and then chosen as the target system (see `DESIGN.md`).

## Decision drivers

- One identity across the app instead of a rebranded landing page in front of an old product.
- Keep the existing token names so feature code does not need to be rewritten.
- Ship a dark-mode variant at the same time as light mode.
- Keep contrast at or above WCAG AA for text and controls.

## Considered options

- Keep the landing-only overrides. Rejected because every other page would stay on the retired identity and the override mechanism (scoped CSS variables) is a preview, not a system.
- Introduce new token namespaces and migrate feature code to them. Rejected for now because `primary1.*` is used throughout the app and the rename would be a large mechanical change with no visual benefit.
- Re-point the existing tokens at the new palette. Chosen.

## Decision outcome

- `primary1` and `primaryAlpha` now resolve to forest-green scales defined in `src/shared/styles/brandPalette.ts`, for both light and dark mode. The legacy `primary` and `brand` 50-900 scales are remapped to the same hue.
- In light mode `primary1.9` is a dark fill (`#223829`). Labels on primary fills use the token `utils.primaryContrast`, which is light in light mode and dark in dark mode. The button theme's `solid` variant applies it for the `primary1` scheme.
- Surfaces are two-tone: `utils.pageBg` (new) is the page background and `utils.pbg` is the raised card and panel surface. `utils.text` is charcoal brown in light mode.
- `fonts.display` (Bricolage Grotesque) is the display voice. `H1` and `H2` use it by default, in `primary1.11`, and landing section titles opt in through `displayHeadingProps`. All other text stays in Figtree.
- Phosphor (`react-icons/pi`) is the only icon set; other `react-icons` packs and `@chakra-ui/icons` were removed from source.
- The landing-only override hooks were deleted.

## Consequences

### Positive

- The whole app shares one identity, in both colour modes, without renaming tokens in feature code.
- Brand values live in one file and are documented in `DESIGN.md`.

### Negative

- Code that assumed `primary1.9` was a light fill with dark text had to be audited and corrected; any missed spot shows dark text on dark green.
- The burnt ochre, terracotta and sage brand colours exist as constants but have no theme scale yet.
- Bricolage Grotesque has no italic; italic display text is synthesised by the browser.
- `docs/STYLE_GUIDE.md` still describes the older colour scale and needs a separate update.

## Implementation status

Implemented on branch `codex/landing-circular-grants-wireframe`: theme tokens, button label logic, heading defaults, app shell background, landing cleanup, icon consolidation, and a source audit of feature code for contrast regressions. Not yet visually verified on every screen.
