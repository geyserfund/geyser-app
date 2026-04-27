/** Lightning funding flow tests for Prism-backed TIA projects */

import { test } from '@playwright/test'

import { clickContribute } from '../../domains/funding/actions'
import { expectFundingAmountScreen } from '../../domains/funding/assertions'
import { LIGHTNING_AMOUNT, PRISM_PROJECT_NAME, TEST_COMMENT, TEST_EMAIL } from '../../domains/funding/constants'
import {
  completeFundingDetails,
  completeFundingInitWithDonation,
  completeFundingInitWithReward,
} from '../../domains/funding/flows'
import { settleVisibleBitcoinPaymentAndConfirm } from '../../domains/funding/settlement'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'

test.describe('Lightning Funding Flows - Prism TIA Projects', () => {
  test.describe.configure({ mode: 'serial' })
  test.setTimeout(180000)

  test.beforeEach(async ({ page }) => {
    const backend = await checkLiveBackendAvailability(page.request)
    test.skip(!backend.ok, `Skipping funding tests: ${backend.reason}`)

    // Navigate to project page
    await page.goto(`/project/${PRISM_PROJECT_NAME}`)
  })

  test('should complete lightning donation successfully', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and settle via Prism-backed payment method.
    await completeFundingInitWithDonation(page, LIGHTNING_AMOUNT)
    await completeFundingDetails(page, { comment: TEST_COMMENT })
    await settleVisibleBitcoinPaymentAndConfirm(page, {
      allowedMethods: ['lightning'],
      skipReason: `Skipping lightning flow: ${PRISM_PROJECT_NAME} only exposed onchain address flow.`,
    })
  })

  test('should complete lightning reward successfully', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)
    const rewardBuyButton = page.getByRole('button', { name: 'Buy' }).first()
    test.skip(
      !(await rewardBuyButton.isVisible().catch(() => false)),
      `Skipping reward flow: ${PRISM_PROJECT_NAME} has no visible rewards.`,
    )

    // Act - Complete funding flow with reward and settle via Prism-backed payment method.
    await completeFundingInitWithReward(page, 0)
    await completeFundingDetails(page, { comment: TEST_COMMENT, email: TEST_EMAIL })
    await settleVisibleBitcoinPaymentAndConfirm(page, {
      allowedMethods: ['lightning'],
      skipReason: `Skipping lightning flow: ${PRISM_PROJECT_NAME} only exposed onchain address flow.`,
    })
  })
})
