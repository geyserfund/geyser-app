/** Onchain funding flow tests */

import { test } from '@playwright/test'

import { clickContribute, clickInitiateRefund, enterRefundAddress } from '../../domains/funding/actions'
import {
  expectFinalSuccessScreen,
  expectFundingAmountScreen,
  expectIntermediateSuccessScreen,
  expectOnchainProcessingScreen,
  expectRefundInitiatedScreen,
  expectTransactionFailedScreen,
} from '../../domains/funding/assertions'
import {
  ONCHAIN_AMOUNT,
  ONCHAIN_AMOUNT_WITH_TIP,
  PROJECT_NAME,
  TEST_COMMENT,
  TEST_EMAIL,
} from '../../domains/funding/constants'
import { completeOnchainDonation, completeOnchainReward } from '../../domains/funding/flows'
import { mineBlock, payOnchain } from '../../domains/shared/bitcoin/lncli'
import { ENV } from '../../domains/shared/constants'

test.describe('Onchain Funding Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to project page
    await page.goto(`/project/${PROJECT_NAME}`)
  })

  test('should complete onchain donation with intermediate and final success states', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and get onchain address
    const address = await completeOnchainDonation(page, ONCHAIN_AMOUNT, TEST_COMMENT)

    // Pay the onchain transaction externally
    await payOnchain(address, ONCHAIN_AMOUNT_WITH_TIP)

    // Assert - Verify intermediate success (transaction processing)
    await expectOnchainProcessingScreen(page)

    // Mine a block to confirm the transaction
    await mineBlock()

    // Wait a moment for the confirmation to be detected
    await page.waitForTimeout(2000)

    // Assert - Verify final success
    await expectFinalSuccessScreen(page)
  })

  test('should complete onchain reward with intermediate and final success states', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow with reward and get onchain address
    const address = await completeOnchainReward(page, TEST_COMMENT, TEST_EMAIL, 0)

    // Pay the onchain transaction externally
    // For rewards, the amount is determined by the reward cost
    // We'll use the same amount for simplicity
    await payOnchain(address, ONCHAIN_AMOUNT_WITH_TIP)

    // Assert - Verify intermediate success (transaction processing)
    await expectOnchainProcessingScreen(page)

    // Mine a block to confirm the transaction
    await mineBlock()

    // Wait a moment for the confirmation to be detected
    await page.waitForTimeout(2000)

    // Assert - Verify final success
    await expectFinalSuccessScreen(page)
  })

  test('should handle onchain refund flow when underpaid', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and get onchain address
    const address = await completeOnchainDonation(page, ONCHAIN_AMOUNT, TEST_COMMENT)

    // Pay LESS than required (underpayment)
    const underpaymentAmount = ONCHAIN_AMOUNT_WITH_TIP - 1000
    await payOnchain(address, underpaymentAmount)

    // Assert - Verify transaction failed screen appears
    await expectTransactionFailedScreen(page)

    // Act - Initiate refund
    await enterRefundAddress(page, ENV.MINE_BLOCK_ADDRESS)
    await clickInitiateRefund(page)

    // Assert - Verify refund initiated
    await expectRefundInitiatedScreen(page)
  })
})
