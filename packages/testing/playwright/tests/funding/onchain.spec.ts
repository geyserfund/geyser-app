/** Onchain funding flow tests for Prism-backed TIA projects */

import { test } from '@playwright/test'

import { clickContribute, clickInitiateRefund, enterRefundAddress } from '../../domains/funding/actions'
import {
  expectFundingAmountScreen,
  expectRefundInitiatedScreen,
  expectTransactionFailedScreen,
} from '../../domains/funding/assertions'
import { ONCHAIN_AMOUNT, PRISM_PROJECT_NAME, TEST_COMMENT, TEST_EMAIL } from '../../domains/funding/constants'
import {
  completeFundingDetails,
  completeFundingInitWithDonation,
  completeFundingInitWithReward,
  getOnchainAddress,
} from '../../domains/funding/flows'
import { settleOnchainPaymentAndConfirm } from '../../domains/funding/settlement'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'
import { payOnchain } from '../../domains/shared/bitcoin/lncli'
import { ENV } from '../../domains/shared/constants'

test.describe('Onchain Funding Flows - Prism TIA Projects', () => {
  test.describe.configure({ mode: 'serial' })
  test.setTimeout(180000)

  test.beforeEach(async ({ page }) => {
    const backend = await checkLiveBackendAvailability(page.request)
    test.skip(!backend.ok, `Skipping funding tests: ${backend.reason}`)

    // Navigate to project page
    await page.goto(`/project/${PRISM_PROJECT_NAME}`)
  })

  test('should complete onchain donation with intermediate and final success states', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and settle payment.
    await completeFundingInitWithDonation(page, ONCHAIN_AMOUNT)
    await completeFundingDetails(page, { comment: TEST_COMMENT })

    // Assert - Verify pending state and final confirmation after mined block.
    await settleOnchainPaymentAndConfirm(page)
  })

  test('should complete onchain reward with intermediate and final success states', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)
    const rewardBuyButton = page.getByRole('button', { name: 'Buy' }).first()
    test.skip(
      !(await rewardBuyButton.isVisible().catch(() => false)),
      `Skipping reward flow: ${PRISM_PROJECT_NAME} has no visible rewards.`,
    )

    // Act - Complete funding flow with reward and settle payment.
    await completeFundingInitWithReward(page, 0)
    await completeFundingDetails(page, { comment: TEST_COMMENT, email: TEST_EMAIL })

    // Assert - Verify pending state and final confirmation after mined block.
    await settleOnchainPaymentAndConfirm(page)
  })

  test('should handle onchain refund flow when underpaid', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and collect onchain payment details.
    await completeFundingInitWithDonation(page, ONCHAIN_AMOUNT)
    await completeFundingDetails(page, { comment: TEST_COMMENT })

    const payment = await getOnchainAddress(page)

    // Pay LESS than required (underpayment) - subtract 1000 sats from exact amount
    const underpaymentAmount = payment.amountSats - 1000
    await payOnchain(payment.address, underpaymentAmount)

    // Assert - Verify transaction failed screen appears
    await expectTransactionFailedScreen(page)

    // Act - Initiate refund
    await enterRefundAddress(page, ENV.MINE_BLOCK_ADDRESS)
    await clickInitiateRefund(page)

    // Assert - Verify refund initiated
    await expectRefundInitiatedScreen(page)
  })
})
