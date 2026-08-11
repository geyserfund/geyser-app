# ADR 0004: Present managed Open-Funding Recoverable Grants

## Status

Accepted

## Context

New Recoverable Grants receive funds into Geyser-managed Stripe and Strike accounts and use one protected Project Goal as their target. Existing All-or-Nothing grants keep their contract-backed experience. The app must not confuse managed providers with creator payment settings or reintroduce excluded product flows.

## Decision drivers

- Make the permanent managed-grant creation model available only to Field Partners.
- Route payment choices from the server’s managed capability object.
- Preserve referral attribution without presenting affiliate payout behavior.
- Reuse established funding visuals without coupling managed grants to AON contracts.

## Considered options

- Gate creation behind `VITE_APP_MANAGED_RECOVERABLE_GRANTS_ENABLED`. Rejected because managed Recoverable Grants are now always enabled and eligibility is role-based.
- Treat managed Stripe as creator Stripe Connect. Rejected because creators do not own or manage the destination account.
- Remove referrer data for managed contributions. Rejected because the server records it as ambassador attribution without referral fees.
- Model Strike as a payment type in the UI. Rejected because Lightning and on-chain are rails and Strike is their provider.

## Decision outcome

Field Partners always see the Recoverable Grant option. Creation persists it as `TAKE_IT_ALL`, exposes one Bitcoin goal amount, skips payment settings and launch plans, and launches only when the server reports at least one managed provider ready. The combination `isRecoverableGrant && TAKE_IT_ALL` selects the managed experience; legacy AON grants remain unchanged.

The one-time contribution flow omits products, rewards, shipping, subscriptions, matching, Guardian rewards, wallet controls, withdrawals, creator Stripe management, and affiliate payout UI. It preserves a non-self `referrerHeroId`; the server owns conversion to ambassador attribution. Payment creation routes exclusively from `paymentMethods.managedRecoverableGrant`, supporting Stripe-only, Strike-only, or both.

Managed Strike state stores Lightning and on-chain details independently. The user’s selected rail controls the initial screen only; tab changes reuse the same contribution and never create another request. The app derives BIP21 from the returned on-chain address and amount and reuses normal QR/payment presentation components. Generated GraphQL `PaymentType` represents `LIGHTNING` and `ON_CHAIN`, while the Strike-specific result fields describe provider instructions.

The canonical server funding summary controls target/deadline closure. Managed grants share the AON-style goal presentation and card progress but never read `aonGoal`, contract state, or AON failure/claim rules. Their deadline is exactly 14 days from launch.

## Consequences

### Positive

- No runtime flag can leave server and app creation behavior out of sync.
- Provider readiness and funding closure remain server-authoritative.
- Attribution survives without exposing affiliate payout expectations.
- Shared visual components preserve consistency while adapters keep AON and managed semantics separate.

### Negative

- Existing managed grants require UI and reconciliation support even if product creation is later stopped.
- The temporary legacy combined `strike` response remains until older clients are retired.

## Validation

- Creation tests cover Field Partner visibility and Open Funding persistence.
- Funding input tests preserve external referrer hero IDs and remove excluded order/Guardian inputs.
- Payment-flow tests cover Stripe-only, Strike-only, both rails, initial selection, and navigation-only tab switching.
- Goal/card tests cover progress, exact deadline, and disabled contribution state.
- Generated GraphQL types are checked after schema changes.

## Rollout and reversal

1. Deploy after the additive server schema and managed provider configuration.
2. Exercise Stripe test mode and Strike sandbox before production use.
3. Monitor contribution creation, provider selection, confirmation, and goal parity.
4. Stopping future managed grants requires an explicit product deployment; no runtime flag exists.
5. Keep existing managed grant screens until all persisted grants and unsettled instructions have a migration or compatibility path.
