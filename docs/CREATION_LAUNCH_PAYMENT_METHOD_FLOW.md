# Creation Launch Payment Method Flow

## Objective
Support Stripe credit-card payments in project creation launch fee flow while preserving existing Lightning behavior and backend `paidLaunch` source of truth.

## Entry Point
- `src/modules/project/pages/projectCreation/views/launch/Launch.tsx`

## Step Flow
1. Review
2. Strategy selection
3. Payment method selection
4. Method-specific payment screen:
   - Lightning: `src/modules/project/pages/projectCreation/views/launch/views/LaunchFees.tsx`
   - Stripe: `src/modules/project/pages/projectCreation/views/launch/views/LaunchFeesStripe.tsx`
5. Finalize

If project already has `paidLaunch=true`, flow continues directly to finalize.

## Payment Method Selection
- Component: `src/modules/project/pages/projectCreation/views/launch/views/LaunchPaymentMethodSelection.tsx`
- Options:
  - `Lightning` (default)
  - `Credit Card (Stripe)`
- Users can switch methods before payment or from the payment screens via method tabs.

## Lightning Path
- Existing launch fee creation path remains Lightning-only:
  - `paymentsInput.lightning.create = true`
- Uses paid-launch metadata in `metadataInput.privateComment`:
  - `paidLaunch: true`
  - `projectId`
  - `launchStrategy`
- Confirmation listener updates local project state `paidLaunch=true`.

## Stripe Path
- Stripe launch fee screen creates contribution with Stripe-only input:
  - `paymentsInput.fiat.create = true`
  - `paymentsInput.fiat.stripe.returnUrl`
  - `paymentsInput.fiat.stripe.theme`
- Reuses the same paid-launch metadata in `privateComment`.
- Embedded Stripe checkout is initialized using response data:
  - `payments.fiat.stripeClientSecret`
  - `payments.fiat.stripeAccountId`
- Contribution confirmation listener updates local project state `paidLaunch=true`.

## Stripe Unavailable Handling
- If contribution creation fails or Stripe checkout details are missing:
  - User is redirected back to payment method selection.
  - Warning/error feedback is shown.
  - Lightning path remains immediately available.

## Config
- Launch-fee target project id:
  - `src/shared/constants/config/env.ts` -> `GEYSER_LAUNCH_PROJECT_ID`
  - Env var: `VITE_APP_GEYSER_LAUNCH_PROJECT_ID`
  - Fallback defaults:
    - production: `3075`
    - staging: `839`
    - development: `939`
    - test fallback: `10`
- Backend launch-fee target ids (must align with frontend target):
  - `geyser-server` env vars:
    - `GEYSER_LAUNCH_PROJECT_ID` (single override)
    - `GEYSER_LAUNCH_PROJECT_IDS` (comma-separated allowlist)
  - Overrides are intended for `development`/`staging`; production keeps defaults.

## Review Acceptance E2E Auth
- `geyser-server` supports dev/staging-only custom JWT auth on `projectReviewSubmit` via:
  - Header: `x-project-review-submit-jwt`
  - Secret: `PROJECT_REVIEW_SUBMIT_JWT_SECRET`
- Playwright full-launch test env:
  - `PROJECT_REVIEW_SUBMIT_JWT` (short-lived JWT minted with scope `project-review-submit`)
  - Optional `PROJECT_CREATION_ACCOUNT_PASSWORD` for password-confirmation screens.
- JWT mint command (from `geyser-server`):
  - `PROJECT_REVIEW_SUBMIT_JWT_SECRET=<secret> yarn mint:project-review-submit-jwt`
  - Non-expiring test token (dev/staging only): `PROJECT_REVIEW_SUBMIT_JWT_SECRET=<secret> yarn mint:project-review-submit-jwt --never-expires`
  - Optional tighter scope for one project: `... --project-id=<newProjectId>`

## Fast Target Switch Procedure (Dev/Staging)
1. Pick a known healthy launch-fee destination project id.
2. Update frontend env: `VITE_APP_GEYSER_LAUNCH_PROJECT_ID=<id>`.
3. Update backend env: `GEYSER_LAUNCH_PROJECT_ID=<id>` (or include in `GEYSER_LAUNCH_PROJECT_IDS`).
4. Restart frontend/backend with updated env.
5. Run Playwright full-launch smoke (`tests/projectCreation/aon.spec.ts`) and verify launch-fee payment settles and publish succeeds.

## Shared Launch Fee Amounts
- `src/modules/project/pages/projectCreation/views/launch/constants/launchFees.ts`
