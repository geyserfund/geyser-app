/** Lightning funding flow tests */

import { test } from '@playwright/test'

import { clickContribute } from '../../domains/funding/actions'
import {
  expectFinalSuccessScreen,
  expectFundingAmountScreen,
  expectLightningQRScreen,
} from '../../domains/funding/assertions'
import { LIGHTNING_AMOUNT, PROJECT_NAME, TEST_COMMENT, TEST_EMAIL } from '../../domains/funding/constants'
import { completeLightningDonation, completeLightningReward } from '../../domains/funding/flows'
import { payLightningInvoice } from '../../domains/shared/bitcoin/lncli'

test.describe('Lightning Funding Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to project page
    await page.goto(`/project/${PROJECT_NAME}`)
  })

  test('should complete lightning donation successfully', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow and get invoice
    const invoice = await completeLightningDonation(page, LIGHTNING_AMOUNT, TEST_COMMENT)

    // Verify we're on the lightning payment screen
    await expectLightningQRScreen(page)

    // Pay the invoice externally via LND
    await payLightningInvoice(invoice)

    // Assert - Verify success
    await expectFinalSuccessScreen(page)
  })

  test('should complete lightning reward successfully', async ({ page }) => {
    // Arrange
    await clickContribute(page)
    await expectFundingAmountScreen(page)

    // Act - Complete funding flow with reward and get invoice
    const invoice = await completeLightningReward(page, TEST_COMMENT, TEST_EMAIL, 0)

    // Verify we're on the lightning payment screen
    await expectLightningQRScreen(page)

    // Pay the invoice externally via LND
    await payLightningInvoice(invoice)

    // Assert - Verify success
    await expectFinalSuccessScreen(page)
  })
})
