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
}

/** Verify intermediate success screen (isPending=true)
 *
 * Note: Tests run as GUEST users. The "View contribution status" button
 * does NOT render for guests during isPending=true (see ContributionStatusSection.tsx).
 *
 * The Download invoice button may not render immediately during intermediate state
 * as contribution data loads asynchronously. We verify pending state through
 * the processing message instead.
 */
export const expectIntermediateSuccessScreen = async (page: Page) => {
  // Success banner is visible
  await expect(page.locator('#successful-contribution-banner')).toBeVisible({ timeout: 15000 })

  // Check for intermediate-specific text
  await expect(page.getByText('successfully submitted contribution to')).toBeVisible()

  // Check for processing message (visible for all users during pending)
  // This is the primary indicator of intermediate/pending state
  await expect(page.getByText('Your transaction is being processed. You can safely leave this page.')).toBeVisible()
}

/** Verify final success screen (isPending=false) */
export const expectFinalSuccessScreen = async (page: Page) => {
  // Success banner is visible
  await expect(page.locator('#successful-contribution-banner')).toBeVisible({ timeout: 15000 })

  // Check for final-specific text (without "submitted")
  await expect(page.getByText(/successfully contributed to/)).toBeVisible()

  // Processing message should NOT be visible
  await expect(page.getByText('Your transaction is being processed')).not.toBeVisible()

  // Button shows "Go to project" (not "View contribution status")
  await expect(page.getByRole('link', { name: 'Go to project' })).toBeVisible()
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
