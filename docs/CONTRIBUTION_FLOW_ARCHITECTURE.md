# Contribution Flow Architecture (Current)

## Scope
This document describes the current project funding contribution flow in the app. It reflects the code as it exists today.

## Routing and layout
- Funding routes are defined in `src/shared/constants/config/routerPaths.ts` and `src/config/routes/routes.tsx`.
- The primary flow is:
  - `/project/:projectName/funding/details` -> `FundingDetails` view
  - `/project/:projectName/funding/support` -> `FundingGuardians` view
  - `/project/:projectName/funding/start` -> `Funding` layout (`src/modules/project/pages/projectFunding/views/fundingPayment/Funding.tsx`)
    - Index route -> `PaymentLoading` (`src/modules/project/pages/projectFunding/views/fundingPayment/views/paymentLoading/PaymentLoading.tsx`)
    - `/payment` -> `Payment` layout (`src/modules/project/pages/projectFunding/views/fundingPayment/Payment.tsx`)
      - `/failed` -> `PaymentFailed`
      - `/lightning` -> `PaymentLightning`
      - `/card` -> `PaymentCard`
      - `/fiat-swap` -> `PaymentFiatSwap`
      - `/onchain` -> `PaymentOnchain` with nested subroutes for prompt, QR, processing, and refund states
- `Payment` renders `PaymentMethodSelection` plus an `Outlet` to the selected payment view.

## State and atoms
Key Jotai atoms used by the funding flow:
- Form state and derived values:
  - `fundingFormStateAtom`, `fundingProjectAtom`, validation atoms and amount calculations in `src/modules/project/funding/state/fundingFormAtom.ts`
- Contribution input and request state:
  - `formattedFundingInputAtom`, `fundingInputAfterRequestAtom` in `src/modules/project/funding/state/fundingContributionCreateInputAtom.ts`
- Contribution and payment details:
  - `fundingContributionAtom` in `src/modules/project/funding/state/fundingContributionAtom.ts`
  - `fundingPaymentDetailsAtom` in `src/modules/project/funding/state/fundingPaymentAtom.ts`
- Payment routing and selection:
  - `paymentMethodAtom`, `intendedPaymentMethodAtom` in `src/modules/project/pages/projectFunding/views/fundingPayment/state/paymentMethodAtom.ts`
- Fiat swap state:
  - `fiatSwapStatusAtom` and `fiatFailureReasonAtom` in `src/modules/project/pages/projectFunding/views/fundingPayment/views/paymentFiatSwap/atom/fiatSwapStatusAtom.ts`
- Swap-related state for AON flows:
  - `swapAtom`, `currentSwapIdAtom`, and related atoms in `src/modules/project/funding/state/swapAtom.ts`

## Contribution creation and payment setup
- `useFundingAPI` in `src/modules/project/funding/hooks/useFundingAPI.ts` drives contribution creation.
- `formattedFundingInputAtom` builds `ContributionCreateInput` and includes `paymentsInput` from `paymentsInputAtom`:
  - Take-It-All projects: `fiat` (Stripe), `lightning`, and `onChainSwap` are set.
  - All-or-Nothing projects: `lightningToRskSwap` and `onChainToRskSwap` are set.
- `requestFunding` validates the input, resets existing contribution state, prepares swap keys and preimages where needed, and calls the `ContributionCreate` mutation.
- On success, it updates `fundingContributionAtom` and `fundingPaymentDetailsAtom`, parses swap data, and may trigger WebLN if enabled.

## Payment loading and navigation
- `PaymentLoadingContribution` (`src/modules/project/pages/projectFunding/views/fundingPayment/views/paymentLoading/PaymentLoadingContribution.tsx`) calls `requestFundingFromContext` once and then routes based on `intendedPaymentMethodAtom`:
  - Lightning -> `fundingPaymentLightning`
  - Fiat swap -> `fundingPaymentFiatSwap`
- Subscriptions route to `fundingSubscription` when the contribution is marked as a subscription.

## Payment flows
- Lightning (`PaymentLightning`):
  - Uses `fundingPaymentDetailsAtom.lightning` or `lightningToRskSwap` for the invoice.
  - Starts success polling via `useListenFundingContributionSuccess`.
  - AON swaps use `useTransactionStatusUpdate` to navigate to awaiting success or failure.
- Onchain (`PaymentOnchain` and nested routes):
  - Guards access based on `fundingPaymentDetailsAtom.onChainSwap` or `onChainToRskSwap`.
  - Nested views handle prompt, QR, processing, and refund states.
- Card (`PaymentCard`):
  - Uses Stripe Embedded Checkout with `fundingPaymentDetailsAtom.fiat.stripeClientSecret`.
- Fiat swap (`PaymentFiatSwap`):
  - Uses `FiatSwapForm` to call `FundingFiatSwapPaymentCreate` and open Banxa checkout.
  - Updates `fundingPaymentDetailsAtom.fiatToLightningSwap` and sets `fiatSwapStatusAtom`.
  - Subscribes to `PaymentStatusUpdated` to move between pending, processing, and failed UI.

## Contribution status tracking
- `useListenFundingContributionSuccess` in `src/modules/project/funding/hooks/useListenFundingContributionSuccess.ts` starts polling and subscription, and navigates to the success screen when the contribution is confirmed or pledged.

## GraphQL operations in this flow
- `MUTATION_CONTRIBUTION_CREATE` in `src/modules/project/graphql/mutation/contributionMutation.ts`
- `MUTATION_FUNDING_FIAT_SWAP_PAYMENT_CREATE` in `src/modules/project/graphql/mutation/contributionMutation.ts`
- `MUTATION_PAYMENT_SWAP_CLAIM_TX_SET` in `src/modules/project/graphql/mutation/contributionMutation.ts`
- `usePaymentStatusUpdatedSubscription` in `src/modules/project/pages/projectFunding/views/fundingPayment/views/paymentFiatSwap/useFiatSwapPaymentSubscription.tsx`
