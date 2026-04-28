/** Atomic funding actions for Playwright tests */

import { Locator, Page } from '@playwright/test'

const FUNDING_ERROR_HEADING = 'An Error Occured'

type OnchainPaymentUiState = 'address' | 'prompt'

const getPaymentControlDiagnostics = async (page: Page, step: string): Promise<string> => {
  const onchainTab = page.getByRole('button', { name: /^Onchain$/i }).first()
  const lightningInvoiceButton = page
    .locator('#copy-lightning-invoice-button')
    .or(page.getByRole('button', { name: /Copy invoice/i }))
    .first()
  const onchainAddressButton = page
    .locator('#copy-onchain-address-button')
    .or(page.getByRole('button', { name: /Copy onchain address|Copy address/i }))
    .first()
  const downloadControl = page
    .getByRole('button', { name: 'Download & Continue' })
    .or(page.getByRole('link', { name: 'Download & Continue' }))
    .first()
  const onchainTitle = await onchainTab.getAttribute('title').catch(() => null)
  const onchainAriaLabel = await onchainTab.getAttribute('aria-label').catch(() => null)
  const isOnchainVisible = await onchainTab.isVisible().catch(() => false)
  const isOnchainEnabled = isOnchainVisible && (await onchainTab.isEnabled().catch(() => false))
  const onchainState = !isOnchainVisible ? 'not visible' : isOnchainEnabled ? 'visible/enabled' : 'visible/disabled'

  return [
    `[Funding:${step}] URL: ${page.url()}`,
    `Onchain tab: ${onchainState}`,
    `Lightning invoice visible: ${await lightningInvoiceButton.isVisible().catch(() => false)}`,
    `Onchain address visible: ${await onchainAddressButton.isVisible().catch(() => false)}`,
    `Download prompt visible: ${await downloadControl.isVisible().catch(() => false)}`,
    onchainTitle ? `Onchain title: ${onchainTitle}` : null,
    onchainAriaLabel ? `Onchain aria-label: ${onchainAriaLabel}` : null,
  ]
    .filter(Boolean)
    .join(' ')
}

const getFundingErrorDiagnostics = async (page: Page, step: string): Promise<string> => {
  const errorMessage = await page
    .getByText("We've encountered an issue with the payment flow.")
    .first()
    .textContent()
    .catch(() => null)

  const onchainTab = page.getByRole('button', { name: /Onchain/i }).first()
  const onchainTitle = await onchainTab.getAttribute('title').catch(() => null)
  const onchainAriaLabel = await onchainTab.getAttribute('aria-label').catch(() => null)

  return [
    `[Funding:${step}] Payment failed screen is visible.`,
    `URL: ${page.url()}`,
    onchainTitle ? `Onchain title: ${onchainTitle}` : null,
    onchainAriaLabel ? `Onchain aria-label: ${onchainAriaLabel}` : null,
    errorMessage ? `Error message: ${errorMessage}` : null,
  ]
    .filter(Boolean)
    .join(' ')
}

export const waitForOnchainPaymentUi = async (
  page: Page,
  step = 'onchain-payment-ui',
  timeoutMs = 20000,
): Promise<OnchainPaymentUiState> => {
  const startedAt = Date.now()
  const fundingErrorHeading = page.getByRole('heading', { name: FUNDING_ERROR_HEADING })
  const onchainAddressButton = page
    .locator('#copy-onchain-address-button')
    .or(page.getByRole('button', { name: /Copy onchain address|Copy address/i }))
    .first()
  const downloadControl = page
    .getByRole('button', { name: 'Download & Continue' })
    .or(page.getByRole('link', { name: 'Download & Continue' }))
    .first()

  while (Date.now() - startedAt < timeoutMs) {
    if (await onchainAddressButton.isVisible().catch(() => false)) {
      return 'address'
    }

    if (await downloadControl.isVisible().catch(() => false)) {
      return 'prompt'
    }

    if (await fundingErrorHeading.isVisible().catch(() => false)) {
      throw new Error(await getFundingErrorDiagnostics(page, step))
    }

    await page.waitForTimeout(250)
  }

  throw new Error(await getPaymentControlDiagnostics(page, step))
}

export const waitForOnchainAddressUi = async (
  page: Page,
  step = 'onchain-address-ui',
  timeoutMs = 20000,
): Promise<void> => {
  const startedAt = Date.now()
  const fundingErrorHeading = page.getByRole('heading', { name: FUNDING_ERROR_HEADING })
  const onchainAddressButton = page
    .locator('#copy-onchain-address-button')
    .or(page.getByRole('button', { name: /Copy onchain address|Copy address/i }))
    .first()

  while (Date.now() - startedAt < timeoutMs) {
    if (await onchainAddressButton.isVisible().catch(() => false)) {
      return
    }

    if (await fundingErrorHeading.isVisible().catch(() => false)) {
      throw new Error(await getFundingErrorDiagnostics(page, step))
    }

    await page.waitForTimeout(250)
  }

  throw new Error(await getPaymentControlDiagnostics(page, step))
}

const waitForFundingTargetOrFail = async (
  page: Page,
  target: Locator,
  step: string,
  timeoutMs = 15000,
): Promise<void> => {
  const startedAt = Date.now()
  const fundingErrorHeading = page.getByRole('heading', { name: FUNDING_ERROR_HEADING })

  while (Date.now() - startedAt < timeoutMs) {
    if (await target.isVisible().catch(() => false)) {
      return
    }

    if (await fundingErrorHeading.isVisible().catch(() => false)) {
      throw new Error(await getFundingErrorDiagnostics(page, step))
    }

    await page.waitForTimeout(200)
  }

  throw new Error(`[Funding:${step}] Timed out waiting for expected UI. URL: ${page.url()}`)
}

/** Click the Contribute button on project page */
export const clickContribute = async (page: Page) => {
  const primaryContributeButton = page.getByTestId('contribute-button').first()
  const fallbackContributeButton = page.getByRole('button', { name: /^Contribute$/i }).last()

  await primaryContributeButton.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined)

  if (await primaryContributeButton.isVisible().catch(() => false)) {
    await primaryContributeButton.click()
  } else {
    await fallbackContributeButton.waitFor({ state: 'visible', timeout: 10000 })
    await fallbackContributeButton.click()
  }

  // Wait for funding page to load - use input instead of conditional heading
  await page.getByTestId('donation-input').waitFor({ state: 'visible', timeout: 10000 })
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

/** Click the Buy button for a reward */
export const clickAddReward = async (page: Page, rewardIndex = 0) => {
  const buyButtons = page.getByRole('button', { name: 'Buy' })
  await buyButtons.nth(rewardIndex).click()
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
  const onchainButton = page.getByRole('button', { name: /^Onchain$/i }).first()

  if (await waitForOnchainPaymentUi(page, 'onchain-existing-state', 1000).catch(() => null)) {
    return
  }

  await onchainButton.waitFor({ state: 'visible', timeout: 15000 }).catch(async () => {
    throw new Error(await getPaymentControlDiagnostics(page, 'onchain-tab-visible'))
  })

  if (!(await onchainButton.isEnabled().catch(() => false))) {
    throw new Error(await getPaymentControlDiagnostics(page, 'onchain-tab-enabled'))
  }

  await onchainButton.click()
  await waitForOnchainPaymentUi(page, 'onchain-tab-after-click')
}

/** Click Download & Continue button for onchain refund file
 *
 * Note: Despite being a <Button> in JSX, this is rendered as a Link
 * due to spread props from useDownloadRefund() containing `as: Link`.
 * Must use getByRole('link'), not getByRole('button').
 */
export const clickDownloadAndContinue = async (page: Page) => {
  const downloadButton = page.getByRole('button', { name: 'Download & Continue' }).first()
  const downloadLink = page.getByRole('link', { name: 'Download & Continue' }).first()
  const actionableDownloadControl = downloadButton.or(downloadLink)

  await waitForFundingTargetOrFail(page, actionableDownloadControl, 'onchain-download-prompt')

  if (await downloadButton.isVisible().catch(() => false)) {
    await downloadButton.scrollIntoViewIfNeeded()
    await downloadButton.click()
    return
  }

  await downloadLink.scrollIntoViewIfNeeded()
  await downloadLink.click()
}

/** Click Copy Lightning Invoice button and return the invoice */
export const clickCopyLightningInvoice = async (page: Page): Promise<string> => {
  const copyButton = page
    .locator('#copy-lightning-invoice-button')
    .or(page.getByRole('button', { name: /Copy invoice/i }))
    .first()
  await waitForFundingTargetOrFail(page, copyButton, 'copy-lightning-invoice')
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
  const copyButton = page
    .locator('#copy-onchain-address-button')
    .or(page.getByRole('button', { name: /Copy onchain address|Copy address/i }))
    .first()
  await waitForFundingTargetOrFail(page, copyButton, 'copy-onchain-address')
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
