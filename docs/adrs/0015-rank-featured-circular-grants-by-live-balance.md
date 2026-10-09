# Rank featured Circular Grants by live balance

- Status: Accepted and implemented
- Date: 2026-10-09

## Context

The homepage's Live Circular Grants grid selected project names from Airtable before querying Geyser. Curated names could omit live grants, include closed grants, and require an external request before loading cards.

## Decision

Use the existing generated `useLandingAboveFoldQuery` hook directly with `isCircularGrant: true`, `status: active`, `goalReached: false`, a limit of three, and descending `balance`. Use descending `launchedAt` to break balance ties. Preserve the server's result order and the existing cards, loading, error, empty, and retry states.

Deprecate the unused legacy Airtable featured component and its fetch function. Keep shared Airtable types and other Airtable integrations intact. Remove the development-only fallback so every environment uses the same selection policy.

## Consequences

The featured grid updates from Geyser data without manual Airtable curation or a request waterfall. Closed, fully funded, and non-circular projects are excluded. If fewer than three live grants exist, show the available grants; query failures show the existing retry state.
