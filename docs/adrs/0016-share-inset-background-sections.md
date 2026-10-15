# Share inset background sections across marketing pages

- Status: Accepted and implemented
- Date: 2026-10-15

## Context

The landing page, Circular Grants explainer, and Latin America Bitcoin Impact Fund (LABIF) page used edge-to-edge hero and section backgrounds. These should become inset panels with corners larger than ordinary cards.

## Decision

Use a shared, presentation-only `InsetSection` under `src/shared/components/layouts`. It provides 6px mobile / at least 12px desktop outer gutters, clips background artwork, and uses shared theme radii of 20px mobile / 28px desktop. Panels and heroes break out of narrower content columns. Desktop width is halfway between the viewport and a panel capped at 1296px with 24px minimum gutters, halving the previous side margins. Ordinary cards use the shared 14px radius; inset images and tiles use 8px. Button radii remain unchanged.

Apply it to `PhotoHero`, the two landing ochre panels, and LABIF's hero and contrasting sponsor section. Centralize the viewport breakout layout in the shared component. Preserve existing backgrounds, content, actions, and data behavior.

## Consequences

The three pages share one responsive framing treatment. Background artwork follows the rounded boundary without viewport-width overflow. Section radii are available through the theme, while content-only sections keep their existing page background and spacing.
