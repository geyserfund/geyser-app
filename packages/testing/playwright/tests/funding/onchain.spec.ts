/** Onchain funding flow tests for TIA (Take It All) projects */

import { test } from '@playwright/test'

import { clickContribute, clickInitiateRefund, enterRefundAddress } from '../../domains/funding/actions'
import {
  expectFinalSuccessScreen,
  expectFundingAmountScreen,
  expectIntermediateSuccessScreen,
  expectRefundInitiatedScreen,
  expectTransactionFailedScreen,
} from '../../domains/funding/assertions'
import { ONCHAIN_AMOUNT, PROJECT_NAME, TEST_COMMENT, TEST_EMAIL } from '../../domains/funding/constants'
import { completeOnchainDonation, completeOnchainReward } from '../../domains/funding/flows'
import { mineBlock, payOnchain } from '../../domains/shared/bitcoin/lncli'
import { ENV } from '../../domains/shared/constants'

test.describe('Onchain Funding Flows - TIA Projects', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to project page
    await page.goto(`/project/${PROJECT_NAME}`)
  })

  test('should complete onchain donation with intermediate and final success states', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and get onchain address with exact amount from BIP21 URI
    const { address, amountSats } = await completeOnchainDonation(page, ONCHAIN_AMOUNT, TEST_COMMENT)

    // Pay the onchain transaction externally with exact amount (includes all fees)
    await payOnchain(address, amountSats)

    // Assert - Verify intermediate success (isPending=true)
    await expectIntermediateSuccessScreen(page)

    // Mine a block to confirm the transaction
    await mineBlock()

    // Wait a moment for the confirmation to be detected
    await page.waitForTimeout(2000)

    // Assert - Verify final success (isPending=false)
    await expectFinalSuccessScreen(page)
  })

  test('should complete onchain reward with intermediate and final success states', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow with reward and get onchain address with exact amount from BIP21 URI
    const { address, amountSats } = await completeOnchainReward(page, TEST_COMMENT, TEST_EMAIL, 0)

    // Pay the onchain transaction externally with exact amount (includes reward cost + all fees)
    await payOnchain(address, amountSats)

    // Assert - Verify intermediate success (isPending=true)
    await expectIntermediateSuccessScreen(page)

    // Mine a block to confirm the transaction
    await mineBlock()

    // Wait a moment for the confirmation to be detected
    await page.waitForTimeout(2000)

    // Assert - Verify final success (isPending=false)
    await expectFinalSuccessScreen(page)
  })

  test('should handle onchain refund flow when underpaid', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and get onchain address with exact amount from BIP21 URI
    const { address, amountSats } = await completeOnchainDonation(page, ONCHAIN_AMOUNT, TEST_COMMENT)

    // Pay LESS than required (underpayment) - subtract 1000 sats from exact amount
    const underpaymentAmount = amountSats - 1000
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
