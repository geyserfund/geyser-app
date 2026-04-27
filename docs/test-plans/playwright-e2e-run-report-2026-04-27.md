# Playwright E2E Run Report - 2026-04-27

## Commands Run

1. `yarn workspace @geyser-app/testing test:playwright:chromium`
   - Scope: full configured Chromium e2e gate.
   - Result: interrupted after the AON creator-claim test remained in its claim polling helper for 5.3 minutes.

2. `yarn workspace @geyser-app/testing playwright test -c playwright/config/playwright.config.ts --project=chromium --grep-invert "AON Full Funding and Creator Claim"`
   - Scope: remaining Chromium tests excluding the hung AON creator-claim test.
   - Result: completed with 18 passed, 3 skipped, and 1 failed.

## Result Summary

| Area | Result |
| --- | --- |
| Authentication | 6 passed |
| Funding error handling | 6 passed |
| Lightning Prism TIA funding | 2 skipped |
| Onchain Prism TIA funding | 1 passed, 1 skipped, 1 failed |
| Project creation | 5 passed |
| AON full funding and creator claim | Blocked by long polling/hung helper |

## Persistent Failure

### Onchain refund flow when underpaid

- Test: `packages/testing/playwright/tests/funding/onchain.spec.ts:66`
- Failing step: `getOnchainAddress(page)` at `packages/testing/playwright/tests/funding/onchain.spec.ts:75`
- Helper failure: `clickCopyOnchainAddress` timed out in `packages/testing/playwright/domains/funding/actions.ts:209`
- Error:
  - `[Funding:copy-onchain-address] Timed out waiting for expected UI.`
  - Final URL stayed on `/funding/start/payment/lightning?transactionId=...`
- Retry: failed again with the same error.

Observed failure artifact:

- Screenshot: `packages/testing/playwright/test-results/funding-onchain-Onchain-Fu-6c0d4--refund-flow-when-underpaid-chromium-retry1/test-failed-1.png`
- Error context: `packages/testing/playwright/test-results/funding-onchain-Onchain-Fu-6c0d4--refund-flow-when-underpaid-chromium-retry1/error-context.md`
- Trace: `packages/testing/playwright/test-results/funding-onchain-Onchain-Fu-6c0d4--refund-flow-when-underpaid-chromium-retry1/trace.zip`

The page snapshot and screenshot show the payment page still on the Lightning invoice tab with a visible `Copy invoice` button. The test expected the onchain QR state and `#copy-onchain-address-button`.

## Blocked/Hung Test

### AON full funding and creator claim

- Test: `packages/testing/playwright/tests/funding/aon-claim.spec.ts:46`
- Blocking step: `waitForAonClaimReady(page, createdProject.projectName)` at `packages/testing/playwright/tests/funding/aon-claim.spec.ts:95`
- Helper location: `packages/testing/playwright/domains/funding/payout.ts:108`
- Interruption location: `page.waitForTimeout(5000)` at `packages/testing/playwright/domains/funding/payout.ts:119`
- Duration before interruption: 5.3 minutes.

Observed artifact:

- Screenshot: `packages/testing/playwright/test-results/funding-aon-claim-AON-Full-2113c-m-an-AON-project-as-creator-chromium/test-failed-1.png`
- Video: `packages/testing/playwright/test-results/funding-aon-claim-AON-Full-2113c-m-an-AON-project-as-creator-chromium/video.webm`

The failure screenshot shows the creator project page with a successful AON campaign and an enabled `Claim` button visible. That suggests the current polling loop can miss the ready state or wait longer than needed even after the UI is ready.

## Fix Plan

### 1. Make `getOnchainAddress` deterministic for Prism/Rsk onchain flows

- Update `clickOnchainTab` so it waits for a concrete post-click outcome:
  - URL contains `/payment/onchain`, `/payment/onchain/qr`, or the onchain copy button is visible.
  - If the route remains on `/payment/lightning`, fail with diagnostics for tab state, warning tooltip, URL, and visible payment controls.
- For Prism/Rsk flows, do not require the `Download & Continue` prompt because `PaymentOnchainPrompt` redirects directly to QR.
- Change `getOnchainAddress` to wait for either:
  - the download prompt, then click it and wait for QR, or
  - the direct QR/copy address button.
- Keep this as an onchain-only helper. It should not silently fall back to Lightning when the caller needs underpayment/refund behavior.

### 2. Tighten assertions around "onchain" success tests

- `settleOnchainPaymentAndConfirm` currently accepts either `onchain` or `lightning`.
- Decide whether the onchain tests are intended to validate onchain specifically.
- If yes, make `settleOnchainPaymentAndConfirm` require `onchain` and skip/fail with a clear reason when onchain is unavailable.
- If no, rename or split the tests so fallback Lightning payment does not make an onchain test look green.

### 3. Fix AON claim readiness polling

- Scope the claim button locator to the creator control panel claim-funds section instead of the first generic `Claim` button on the page.
- After each `page.goto`, wait for the page's project/control-panel content to be loaded before checking the button.
- Replace the fixed 5-second sleep loop with `expect.poll` or `expect(locator).toBeEnabled({ timeout })` plus periodic reloads only when needed.
- Add diagnostics on timeout showing current URL, campaign status card text, control panel text, and claim button visibility/enabled state.

### 4. Add targeted verification runs after fixes

- First run the narrow failing specs:
  - `yarn workspace @geyser-app/testing playwright test -c playwright/config/playwright.config.ts --project=chromium tests/funding/onchain.spec.ts -g "refund flow"`
  - `yarn workspace @geyser-app/testing playwright test -c playwright/config/playwright.config.ts --project=chromium tests/funding/aon-claim.spec.ts`
- Then run the full Chromium gate:
  - `yarn workspace @geyser-app/testing test:playwright:chromium`
- Review screenshots/traces for any remaining live-backend flake before changing app code.

## Report Artifacts

- HTML report: `packages/testing/playwright/playwright-report/index.html`
- Test results: `packages/testing/playwright/test-results/`

