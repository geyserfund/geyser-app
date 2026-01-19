/** Funding assertions for Playwright tests */

import { expect, Page } from '@playwright/test'

/** Verify funding amount screen is visible */
export const expectFundingAmountScreen = async (page: Page) => {
  await expect(page.getByRole('heading', { name: 'Make a donation' })).toBeVisible({ timeout: 10000 })
  await expect(page.getByTestId('donation-input')).toBeVisible()
}

/** Verify comment screen (FundingDetails) is visible */
export const expectCommentScreen = async (page: Page) => {
  await expect(page.getByRole('heading', { name: 'Public comment' })).toBeVisible({ timeout: 10000 })
  await expect(page.getByTestId('funding-comment-input')).toBeVisible()
}

/** Verify guardians screen is visible (logged in users only) */
export const expectGuardiansScreen = async (page: Page) => {
  // Guardians screen has specific content - adjust based on actual implementation
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible({ timeout: 10000 })
}

/** Verify Lightning QR screen is visible */
export const expectLightningQRScreen = async (page: Page) => {
  // QR code canvas
  await expect(page.locator('canvas#qr-code')).toBeVisible({ timeout: 10000 })
  // Copy button
  await expect(page.locator('#copy-lightning-invoice-button')).toBeVisible()
}

/** Verify Onchain QR screen is visible */
export const expectOnchainQRScreen = async (page: Page) => {
  // QR code canvas
  await expect(page.locator('canvas#qr-code')).toBeVisible({ timeout: 10000 })
  // Copy button
  await expect(page.locator('#copy-onchain-address-button')).toBeVisible()
  // Processing card should NOT be visible yet
  await expect(page.locator('#onchain-transaction-processing-card')).not.toBeVisible()
}

/** Verify onchain processing screen (intermediate state) */
export const expectOnchainProcessingScreen = async (page: Page) => {
  await expect(page.locator('#onchain-transaction-processing-card')).toBeVisible({ timeout: 15000 })
  // Success banner should NOT be visible yet
  await expect(page.locator('#successful-contribution-banner')).not.toBeVisible()
}

/** Verify intermediate success screen (FundingSuccessIntermediate) */
export const expectIntermediateSuccessScreen = async (page: Page) => {
  // This is the new intermediate success state for onchain
  // It shows success UI but isPending=true
  await expect(page.locator('#successful-contribution-banner')).toBeVisible({ timeout: 15000 })
  // Could also check for specific "pending" indicators if they exist
}

/** Verify final success screen */
export const expectFinalSuccessScreen = async (page: Page) => {
  await expect(page.locator('#successful-contribution-banner')).toBeVisible({ timeout: 15000 })
}

/** Verify transaction failed screen */
export const expectTransactionFailedScreen = async (page: Page) => {
  await expect(page.locator('#transaction-failed-card')).toBeVisible({ timeout: 15000 })
  await expect(page.locator('#refund-address-input')).toBeVisible()
  await expect(page.locator('#initiate-refund-button')).toBeVisible()
}

/** Verify refund initiated screen */
export const expectRefundInitiatedScreen = async (page: Page) => {
  await expect(page.locator('#refund-initiated-card')).toBeVisible({ timeout: 15000 })
}
