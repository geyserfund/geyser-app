/** Atomic funding actions for Playwright tests */

import { Page } from '@playwright/test'

/** Click the Contribute button on project page */
export const clickContribute = async (page: Page) => {
  const contributeButton = page.getByRole('button', { name: 'Contribute' })
  await contributeButton.waitFor({ state: 'visible', timeout: 10000 })
  await contributeButton.click()

  // Wait for funding page to load
  await page.getByRole('heading', { name: 'Make a donation' }).waitFor({ state: 'visible', timeout: 10000 })
}

/** Toggle donation input between USD and sats */
export const clickToggleDonationInput = async (page: Page) => {
  await page.getByTestId('toggle-donation-input').click()
}

/** Enter donation amount in the input field */
export const enterDonationAmount = async (page: Page, amount: number) => {
  const input = page.getByTestId('donation-input')
  await input.waitFor({ state: 'visible' })
  await input.clear()
  await input.fill(amount.toString())
}

/** Click the Add button for a reward */
export const clickAddReward = async (page: Page, rewardIndex = 0) => {
  const addButtons = page.getByRole('button', { name: 'Add' })
  await addButtons.nth(rewardIndex).click()
}

/** Click Continue button on FundingInit page */
export const clickContinueFromInit = async (page: Page) => {
  // Wait for the button to be ready
  const continueButton = page.getByRole('button', { name: 'Continue' }).first()
  await continueButton.waitFor({ state: 'visible' })
  await continueButton.click()
}

/** Enter comment in the funding comment textarea */
export const enterComment = async (page: Page, comment: string) => {
  const commentInput = page.getByTestId('funding-comment-input')
  await commentInput.waitFor({ state: 'visible' })
  await commentInput.fill(comment)
}

/** Enter email address in the email input */
export const enterEmail = async (page: Page, email: string) => {
  const emailInput = page.getByRole('textbox', { name: /email/i })
  await emailInput.waitFor({ state: 'visible' })
  await emailInput.fill(email)
}

/** Click Continue button on FundingDetails page */
export const clickContinueFromDetails = async (page: Page) => {
  const continueButton = page.getByRole('button', { name: 'Continue' }).last()
  await continueButton.waitFor({ state: 'visible' })
  await continueButton.click()
}

/** Click Checkout button on FundingGuardians page (logged in users only) */
export const clickCheckout = async (page: Page) => {
  const checkoutButton = page.getByRole('button', { name: 'Checkout' })
  await checkoutButton.waitFor({ state: 'visible' })
  await checkoutButton.click()
}

/** Click the Onchain tab to switch payment method */
export const clickOnchainTab = async (page: Page) => {
  const onchainButton = page.getByRole('button', { name: 'Onchain' })
  await onchainButton.waitFor({ state: 'visible' })
  await onchainButton.click()
}

/** Click Download & Continue button for onchain refund file
 *
 * Note: Despite being a <Button> in JSX, this is rendered as a Link
 * due to spread props from useDownloadRefund() containing `as: Link`.
 * Must use getByRole('link'), not getByRole('button').
 */
export const clickDownloadAndContinue = async (page: Page) => {
  // Note: This is rendered as a Link (role="link"), not Button, due to spread props
  const downloadButton = page.getByRole('link', { name: 'Download & Continue' })
  await downloadButton.waitFor({ state: 'visible' })
  await downloadButton.scrollIntoViewIfNeeded()
  await downloadButton.click()
}

/** Click Copy Lightning Invoice button and return the invoice */
export const clickCopyLightningInvoice = async (page: Page): Promise<string> => {
  const copyButton = page.locator('#copy-lightning-invoice-button')
  await copyButton.waitFor({ state: 'visible' })
  await copyButton.scrollIntoViewIfNeeded()

  // Grant clipboard permissions
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])

  await copyButton.click()

  // Wait a moment for clipboard to be populated
  await page.waitForTimeout(500)

  // Read from clipboard
  const invoice = await page.evaluate(async () => {
    return await navigator.clipboard.readText()
  })

  return invoice
}

/** Click Copy Onchain Address button and return the BIP21 URI */
export const clickCopyOnchainAddress = async (page: Page): Promise<string> => {
  const copyButton = page.locator('#copy-onchain-address-button')
  await copyButton.waitFor({ state: 'visible' })
  await copyButton.scrollIntoViewIfNeeded()

  // Grant clipboard permissions
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])

  await copyButton.click()

  // Wait a moment for clipboard to be populated
  await page.waitForTimeout(500)

  // Read from clipboard
  const bip21Uri = await page.evaluate(async () => {
    return await navigator.clipboard.readText()
  })

  return bip21Uri
}

/** Enter refund address in the refund form */
export const enterRefundAddress = async (page: Page, address: string) => {
  const refundInput = page.locator('#refund-address-input')
  await refundInput.waitFor({ state: 'visible' })
  await refundInput.fill(address)
}

/** Click Initiate Refund button */
export const clickInitiateRefund = async (page: Page) => {
  const refundButton = page.locator('#initiate-refund-button')
  await refundButton.waitFor({ state: 'visible' })
  await refundButton.click()
}
