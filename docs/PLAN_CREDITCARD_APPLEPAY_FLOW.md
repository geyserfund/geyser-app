# Credit Card + Apple Pay Flow Plan (TIA Only)

## Goals and constraints
- Add a new "Continue with Apple Pay" option alongside "Continue with Credit Card" in `src/modules/project/pages/projectFunding/components/ContinueWithButtons.tsx`.
- Only show the Apple Pay button on macOS or iOS.
- Credit card and Apple Pay must route to a new screen (not `PaymentLoading`).
- The new screen must be dedicated to credit card and Apple Pay, with no `PaymentMethodSelection` UI.
- Apple Pay and credit card follow the same flow; Apple Pay only adds `paymentMethod: 'applePay'` when creating the fiat payment.
- `PaymentFiatSwap` stays unchanged; create a new `PaymentCreditCard` view by copying its functional behavior.
- For the credit card/Apple Pay flow, the contribution create input must not include lightning or onchain payments; only fiat should be included.
- This change is for Take-It-All projects only. All-or-Nothing projects keep the current flow.

## Current flow touchpoints (for reference)
- `ContinueWithButtons` sets `intendedPaymentMethodAtom` and navigates to `fundingStart`.
- `fundingStart` index renders `PaymentLoading`, which creates the contribution via `useFundingAPI` and then navigates to the payment screen.
- `Payment` renders `PaymentMethodSelection` plus the selected payment view.
- `PaymentFiatSwap` handles Banxa checkout (via `contributionPaymentsAdd`) and subscribes to fiat swap status updates.
- `formattedFundingInputAtom` builds `ContributionCreateInput` and includes multiple payment methods based on `ProjectFundingStrategy`.

## Implementation steps
1. Routing and entry point
   - Add two new funding routes for the credit card/Apple Pay flow under the `fundingStart` tree, but outside the `Payment` wrapper so `PaymentMethodSelection` is not rendered:
     - `payment/creditCard`
     - `payment/applepay`
   - Update:
     - `src/shared/constants/config/routerPaths.ts` (new `PathName` + `getPath` helper)
     - `src/config/routes/routes.tsx` (route definition)
     - `src/config/routes/routeGroups.ts` (for route matching atoms and route implications)

2. Selection state for credit card vs Apple Pay
   - Add a dedicated atom for fiat checkout selection, e.g. `fiatPaymentMethodAtom` with `creditCard | applePay`.
   - Set it in `ContinueWithButtons` when navigating to the new screen.
   - Keep `intendedPaymentMethodAtom` unchanged for existing Lightning/Onchain flows.
   - Only render the Apple Pay button when the client is on macOS or iOS.

3. Fiat-only contribution creation
   - Add a new method in `useFundingAPI` that clones `formattedFundingInputAtom` and replaces `paymentsInput` with a fiat-only input.
   - Create `fiatOnlyPaymentsInputAtom` and use it to replace `paymentsInput` on the cloned funding input (do not create a new formatted input atom).
   - This new method must skip lightning/onchain preimage generation and swap parsing.

4. `PaymentCreditCard` view
   - Create `src/modules/project/pages/projectFunding/views/fundingPayment/views/paymentCreditCard/PaymentCreditCard.tsx`.
   - Copy the functional flow from `PaymentFiatSwap`:
     - Use `useListenFundingContributionSuccess`, `fiatSwapStatusAtom`, and `useFiatSwapPaymentSubscription`.
     - Reuse `FiatSwapAwaitingPayment`, `FiatSwapProcessing`, `FiatSwapFailed`, and `FiatSwapContributorNotVerified` as needed.
   - Remove owner-not-verified and login-required UI from this view; those cases should stay on the existing flow.
   - Add UI variants:
     - Credit card: dropdown currency selector (like `FiatSwapForm`), plus the Bitcoin purchase notice.
     - Apple Pay: segmented currency buttons for `USD`, `EUR`, `GBP` (per the screenshot).
   - Update the Banxa input shape for Apple Pay:\n+     ```
     input ContributionFiatToLightningSwapPaymentDetailsBanxaInput {\n+       fiatCurrency: String!\n+       paymentMethodId: String!\n+       returnUrl: String!\n+     }\n+     ```\n+   - In the fiat swap creation call, include `paymentMethodId: 'apple-pay'` only when Apple Pay is selected.

5. `ContinueWithButtons` behavior
   - Add Apple Pay button (use `react-icons/pi` per UI guidelines).
   - For TIA + fiat payment enabled: navigate directly to the new credit card/Apple Pay screen and set the fiat selection state.
   - For AON or when fiat payments are not available: keep the current flow (navigate to `fundingStart` and use `PaymentLoading`).

6. Error and state handling
   - Reuse the `PaymentLoadingContribution` pattern to prevent duplicate contribution creates (ref guard or equivalent).
   - Route to `fundingPaymentFailed` if the fiat-only contribution creation fails.

## Maintainability upgrades (planned)
- Extract a shared `buildContributionCreateInput` helper so standard and fiat-only flows reuse the same base input logic.
- Create a reusable `FiatSwapStatusView` component to keep status rendering consistent between `PaymentFiatSwap` and `PaymentCreditCard`.
- Add a typed `FiatCheckoutMethod` enum to avoid conflating credit card/Apple Pay selection with `PaymentMethods` routing.
- Centralize payment method eligibility checks (e.g., `hasFiatPaymentMethodAtom`, funding strategy) in a single selector to reduce duplicated gating logic.
