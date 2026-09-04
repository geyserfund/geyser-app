# Retire Prism and ordinary TIA funding

## Context

Prism intake is paused and there are no active TIA contributions flowing through Prism. `TAKE_IT_ALL` now represents two distinct generations: legacy ordinary TIA projects and managed Recoverable Grants. Managed Recoverable Grants use Geyser-managed Stripe and Strike payment capabilities and must remain operational.

## Decision

New project creation accepts only managed Recoverable Grants. The app presents that option as the sole creation funding choice, and the server enforces both the managed discriminator and Field Partner eligibility. Existing project records remain readable; ordinary TIA projects are retired and cannot receive new contributions, while managed Recoverable Grants remain eligible under their existing protected-goal and provider rules.

Prism-specific claim construction, configuration, and app funding branches are removed from public contribution flows. Because the configured Geyser Launch destination is still a legacy TIA project, the paid-launch flow retains a narrowly scoped Prism claim compatibility branch; it is reachable only for that configured destination and is not a public TIA funding option. Historical Rootstock wallet, payout, refund, account-key, and generated GraphQL compatibility needed to access existing records remains until a separate retention decision. Generic user-wallet withdrawals are unaffected. Creator payout actions are not exposed for managed Recoverable Grants because their disbursement is managed by Geyser.

The temporary Boltz contingency remains an independent AON/direct-payment concern and is not removed by this decision. No database migration is required: the persisted `isRecoverableGrant` discriminator and existing payment history are retained.

## Consequences

Stale clients cannot create ordinary TIA, AON, or non-grant projects because the server is the enforcement boundary. Legacy TIA pages and data may still contain compatibility terminology, but they cannot re-enter the active contribution flow. Managed Stripe/Strike payment creation and reconciliation remain in place.

The deployed Prism contract is permissionless and has no application shutdown mechanism; decommissioning therefore means removing Geyser callers and configuration, not attempting an on-chain shutdown.

## Validation

- Creation tests cover managed-grant-only creation and Field Partner authorization.
- Funding tests cover ordinary TIA closure, managed-grant eligibility, and managed provider payment creation.
- Claim-policy tests reject Prism calldata while preserving AON validation.
- App tests cover the sole managed-grant creation option and preserve legacy read/recovery access.

## Status

Accepted
