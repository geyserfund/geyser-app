/** Lightning funding flow tests for Prism-backed TIA projects */

import { Page, test } from '@playwright/test'

import { clickContribute, clickDownloadAndContinue } from '../../domains/funding/actions'
import {
  expectFinalSuccessScreen,
  expectFundingAmountScreen,
  expectIntermediateSuccessScreen,
} from '../../domains/funding/assertions'
import { LIGHTNING_AMOUNT, PRISM_PROJECT_NAME, TEST_COMMENT, TEST_EMAIL } from '../../domains/funding/constants'
import {
  completeFundingDetails,
  completeFundingInitWithDonation,
  completeFundingInitWithReward,
  getLightningInvoice,
} from '../../domains/funding/flows'
import { checkLiveBackendAvailability } from '../../domains/shared/backend'
import { mineBlock, payLightningInvoice } from '../../domains/shared/bitcoin/lncli'

const mineBlockOrSkipWhenUnauthorized = async () => {
  try {
    await mineBlock()
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to mine block: 401')) {
      test.skip(true, 'Skipping final-confirmation check: BITCOIND_AUTH is unauthorized in this environment.')
      return
    }

    throw error
  }
}

const settlePrismPayment = async (page: Page) => {
  const onchainDownloadControl = page
    .getByRole('button', { name: /Download & Continue/i })
    .or(page.getByRole('link', { name: /Download & Continue/i }))
    .first()
  const lightningInvoiceButton = page
    .locator('#copy-lightning-invoice-button')
    .or(page.getByRole('button', { name: /Copy invoice/i }))
    .first()
  const onchainAddressButton = page
    .locator('#copy-onchain-address-button')
    .or(page.getByRole('button', { name: /Copy onchain address|Copy address/i }))
    .first()

  await Promise.race([
    onchainDownloadControl.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
    lightningInvoiceButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
    onchainAddressButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
  ])

  if (await onchainDownloadControl.isVisible().catch(() => false)) {
    await clickDownloadAndContinue(page)
  }

  await Promise.race([
    lightningInvoiceButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
    onchainAddressButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined),
  ])

  if (await onchainAddressButton.isVisible().catch(() => false)) {
    test.skip(true, `Skipping lightning flow: ${PRISM_PROJECT_NAME} only exposed onchain address flow.`)
    return
  }

  const invoice = await getLightningInvoice(page)
  await payLightningInvoice(invoice)
  await expectIntermediateSuccessScreen(page)
  await mineBlockOrSkipWhenUnauthorized()
  await expectFinalSuccessScreen(page, { timeoutMs: 90000 })
}

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
    await settlePrismPayment(page)
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
    await settlePrismPayment(page)
  })
})
