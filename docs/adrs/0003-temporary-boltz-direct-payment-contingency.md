# Temporary Boltz direct-payment contingency

## Context

Boltz swaps are temporarily unavailable, so the normal Rootstock-backed funding path cannot safely accept new contributions.

## Decision

`TEMPORARY_BOLTZ_CONTINGENCY_ENABLED` in `src/modules/project/constants/temporaryBoltzContingency.ts` gates a temporary direct-payment experience. It consumes the server's typed `directPaymentDetails` object backed by nullable `direct_payment_details JSONB` (`{ btcAddress, lightningAddress }`). It keeps All-or-Nothing visible but disabled and labelled “Temporarily unavailable,” hides Recoverable Grant, and guards product create/edit/list flows unless Stripe is configured. It replaces the creation payment setup with the shared direct-payment form and replaces normal contribution handoff with a direct-payment modal. Direct funding URLs redirect to the project and open that modal when payment details exist.

The original payment, product, ambassador, launch-plan, and funding code remains in place. The shared direct-payment form requires one payment method, validates Bitcoin mainnet addresses locally and Lightning Addresses with the existing verification query (including live success/failure status). The direct-payment contribution modal links its temporary-service-provider warning to `https://geyser.fund/news` and shows one toggle per configured Bitcoin/Lightning method, with the shared funding-flow QR component centered in the modal and a copy action for each address. It also includes the zero-fee Geyser support notice linking to the Geyser project and Guardians pages.

Stripe Connect is the exception to the direct-payment fallback. When a project has Stripe enabled, the legacy missing-RSK-wallet contribution gate is bypassed and the contribution selector exposes only Stripe—not Banxa/card. During the contingency, this decision trusts the persisted Stripe payment-method configuration rather than the general country-eligibility helper. When the same project also has direct payment details, direct payment remains the first contribution step and its modal offers a **Pay with Stripe** button that enters the normal funding flow. Stripe-eligible projects show Stripe configuration first in creation, while Dashboard Payment Settings shows Direct Bitcoin/Lightning details first and Stripe second. The normal funding selector keeps Bitcoin visible during the contingency but disables it and labels it “Temporarily unavailable.”

During the contingency, the creation launch-plan screen locks all plan cards, forces the Basic plan, marks it “Waived,” and bypasses launch-fee payment. The paid plans are labelled “Temporarily unavailable.” Take-It-All projects may launch without an RSK EOA because the temporary direct-payment flow does not use Rootstock; the server restores that prerequisite when the flag is disabled. The app also suppresses the legacy “Wallet not configured” notices in the project control panel and My Projects cards, but retains read-only Project Wallet history, recovery-data, and derivation-path access at the bottom of Payment Settings. The shared Ambassador Network card displays an info notice in creation and launch-plan surfaces stating that its fee does not apply to direct Bitcoin payments.

## Consequences

Direct payments do not create Geyser contributions, fees, ambassador-network fees, or Community activity. Creators are explicitly warned and contributors see a direct-payment disclaimer.

## Reversal checklist

1. Set `TEMPORARY_BOLTZ_CONTINGENCY_ENABLED` to `false` in the app and server.
2. Regenerate GraphQL types from the synchronized schema.
3. Deploy the original Boltz flow and confirm normal contribution, RSK EOA launch prerequisite, product/reward, ambassador-fee, and launch-fee flows end to end.
4. Restore selectable All-or-Nothing/Recoverable Grant and launch plans; remove the Basic-plan waiver and temporary Ambassador Network notice.
5. Keep or remove `direct_payment_details` only after confirming no project still relies on it; any removal requires a separate reviewed migration.

## Status

Active temporary mitigation as of 2026-08-07.
