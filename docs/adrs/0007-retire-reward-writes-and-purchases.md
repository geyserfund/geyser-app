# Retire reward writes and purchases

* Status: accepted
* Date: 2026-08-31

## Context and problem statement

Rewards remain visible as historical project and order data, but new reward marketplace activity is no longer supported. The app currently offers reward creation and editing, reward purchases, shipping collection, currency settings, and order-status controls.

## Decision drivers

* Remove all user-facing paths that create, edit, delete, reprice, purchase, or fulfill rewards.
* Keep read-only reward cards/pages and historical order, sales, analytics, shipping, and activity views.
* Preserve normal donations, recurring funding, memberships, project goals, and guardian badge metadata flows.
* Avoid deleting historical data or introducing a schema migration.

## Considered options

1. Hide marketplace controls but retain client mutations — rejected because stale clients and direct calls could still attempt writes.
2. Remove all reward and order reads — rejected because historical records must remain viewable.
3. Remove marketplace UI and mutation documents, remove order/shipping write usage, and regenerate against the server's read-only schema — selected.

## Decision outcome

The app no longer renders reward creation/editing or purchase controls, collects shipping details for new funding, sends order inputs, or updates order status. Reward and order read fragments, historical summaries, sales tables, analytics, activity, and read-only reward presentation remain. The sales table displays stored status without an update control. The generated GraphQL client is regenerated from the retired server schema.

Guardian badge metadata and its separate contribution flow remain; guardian badge records must not be treated as project-reward purchases.

## Consequences

* Existing bookmarks to retired creator and checkout screens no longer provide a marketplace write path.
* Historical order pages can still display stored products, shipping addresses, totals, and statuses.
* Client compatibility exports that are still required by historical fixtures are deprecated and must not be wired into active funding UI.
* Existing orders are not transitioned by the app and require manual/off-system resolution.

## More information

The server-side decision is recorded in the geyser-server ADR with the same date and scope.
