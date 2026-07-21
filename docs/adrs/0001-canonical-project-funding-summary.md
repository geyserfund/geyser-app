# ADR 0001: Canonical project funding summary

## Status

Accepted

## Context

Project cards previously assembled funding state from several independent `Project` fields and, for AON projects, contract configuration/state. Concurrent API responses could therefore combine values from different points in time and regress visible progress.

Funding-related data has different costs and update characteristics. Core AON progress needs an RSK RPC read; matching and project goals are database-derived. Treating them as one physical cache would cause matching or goal changes to trigger unnecessary RSK reads.

## Decision

Expose one public GraphQL interface, `Project.fundingSummary`, for card-facing funding data. It is composed from independently sourced and cached sections:

- Core funding summary: strategy, displayed raised amounts, goal/progress, lifecycle state, deadline, and canonical funding eligibility. AON reads use authoritative RSK contract state.
- `matching: ProjectMatchingFundingSummary`: active matching data.
- `goals: ProjectGoalFundingSummary`: completed and in-progress goals.

The core, matching, and goals sections use separate Redis cache-aside keys with a fifteen-minute fallback TTL. The matching and goals fields are resolved lazily, so an operation only pays for the sections it selects. This keeps normal landing cards from reading project goals and prevents matching/goal invalidations from causing an RSK RPC call.

Landing-card fragments must select funding state from `fundingSummary`, not from `Project.balance`, `Project.balanceUsdCent`, `Project.fundingStrategy`, `Project.activeMatching`, or `aonGoal`.

Legacy `Project` fields remain available for configuration, dashboard, and compatibility views until a separately planned API deprecation.

## Consequences

- Card progress and availability have one server-owned source of truth.
- RSK reads are bounded by the core-summary cache and event-driven refreshes.
- New funding-related card data belongs in a section of `fundingSummary` when it shares this consistency boundary; it should not be duplicated on `Project`.
- Each section needs explicit invalidation for every mutation or event that changes it.

## Implementation status

Implemented for core funding, matching, and goals. Landing cards currently select core and matching only.
