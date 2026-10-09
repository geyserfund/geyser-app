# Share the Impact Fund donation flow in navigation

Date: 2026-10-09
Status: Accepted and implemented

## Context

Navigation donation buttons routed directly to the Geyser project, bypassing the region and purpose preferences collected by the Impact Fund page. Desktop dropdowns and mobile sidebars close after an action, so they cannot own the lifetime of the donation modal.

## Decision

Mount a navigation donation provider in `AppLayout`. Reuse the Impact Fund module's existing `useImpactFundsDonateModal` hook and expose its open action to navigation buttons through context. Keep preference collection and funding routing in the Impact Fund module.

Legacy `/projects` discovery uses the paginated project query with `isCircularGrant: false` and defaults to total funding. Monthly ranking remains available on fundraisers and campaigns; it is omitted on legacy discovery because that API cannot exclude circular grants and only returns projects with recent contributions.

## Consequences

Desktop and mobile donation actions open the same preferences flow and the modal survives menu closure. The layout loads Impact Fund metadata through the existing Apollo query/cache. Impact Fund program pages retain their existing modal instances and category presets. Legacy category, region, search, and pagination filters continue to use the project query.
