# ADR 0002: Shared LABIF promotional banner

## Status

Accepted

## Context

The Latin America Bitcoin Impact Fund promotion appears on both the Impact Funds page and the discovery landing page. Keeping independent implementations would allow copy, actions, committed-sats presentation, and responsive artwork treatment to drift.

## Decision

Use one business-logic-free `LabifBanner` in `src/shared/components`. Page owners pass the LABIF route, the existing `#apply` action route, and the committed-sats display value. The banner remains responsible only for presentational layout and does not fetch data or own application state.

## Consequences

- LABIF copy and visual treatment stay consistent across the two module domains.
- The Impact Funds page can provide its live committed-sats amount without introducing a landing-page data dependency.
- Application behavior remains owned by the LABIF detail page, including its authentication and project-selection flow.

## Implementation status

Implemented.
