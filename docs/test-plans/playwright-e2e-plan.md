# Playwright E2E Stabilization Plan (Funding-First, Then Existing Failures)

## Summary
- Goal: make current Playwright E2E suite pass reliably (funding first, then other currently failing Playwright specs), then expand Playwright coverage directly in Playwright.
- Funding failures are a mix of live backend instability and stale selectors/assertions in Playwright funding helpers/specs.
- Funding failed-route navigation had a production path bug (trailing whitespace) and is included as a minimal app fix.
- Project creation failures are primarily driven by fragile real-auth sequencing plus stale launch-flow assumptions.
- Root script and CI gate on Playwright Chromium.

## Implementation Changes

### Phase 1: Playwright Baseline
- Make Playwright Chromium the default `test:e2e` gate.
- Remove the legacy E2E suite and commands.
- Keep CI on Playwright Chromium execution.
- Ensure CI passes required env vars expected by Playwright config.
- Persist Playwright artifacts (trace/video/screenshots/report) in CI.

### Phase 2: Funding Flow Fixes
- Update funding selectors and assertions to current UI semantics:
  - onchain prompt button/link handling for `Download & Continue`.
  - pending/final success copy assertions.
  - final CTA semantics (`Back to project`).
- Add explicit diagnostics for payment-failed states so failures report actionable context.
- Keep core funding success/refund paths live-backend.

### Phase 3: Non-funding Existing Failures
- Harden real-auth flow to avoid brittle response-order waits and click interception.
- Shift real-auth success criteria to outcome-based checks (logged-in UI state).
- Serialize/limit auth-sensitive suite execution paths for stability.
- Update project-creation navigation assumptions to current launch-start behavior and labels.
- Tighten project-creation step waits and selectors where brittle.
- Add live-backend availability checks for real-auth/funding/project-creation suites, and skip those suites when backend/auth services are returning transport or 5xx/404 outage signals.

### Phase 4: Add Playwright Funding Error Coverage
- Cover the funding error matrix in Playwright via deterministic GraphQL interception of `ContributionCreate`:
  - invalid funding amount (max)
  - invalid funding amount (min)
  - wallet unreachable
  - inactive project
  - reward out of stock
  - internal server error

## Public Interface / Contract Changes
- Root `test:e2e` now gates Playwright Chromium.
- CI workflow semantics use Playwright Chromium for pull requests and production pushes.

## Test Plan
- Required pass scope:
  - `packages/testing/playwright/tests/funding/*.spec.ts`
  - `packages/testing/playwright/tests/projectCreation/aon.spec.ts`
  - auth specs (`login-logout.spec.ts`, `real-auth.spec.ts`) on Chromium
- Reliability target:
  - three consecutive green Chromium runs for funding + project creation before expansion.
- CI acceptance:
  - Playwright Chromium workflow green with retained artifacts.

## Assumptions
- Funding/project-creation core flows remain live-backend (no full-flow mocking).
- Minimal app fixes needed for test correctness are in scope.
- Chromium is the gating browser for now; multi-browser gating is deferred.
