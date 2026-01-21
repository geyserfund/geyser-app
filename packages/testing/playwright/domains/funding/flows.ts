/** Composed funding flows for Playwright tests */

import { Page } from '@playwright/test'

import {
  clickAddReward,
  clickContinueFromDetails,
  clickContinueFromInit,
  clickCopyLightningInvoice,
  clickCopyOnchainAddress,
  clickDownloadAndContinue,
  clickOnchainTab,
  clickToggleDonationInput,
  enterComment,
  enterDonationAmount,
  enterEmail,
} from './actions'
import { FundingDetailsOptions } from './types'

/** Complete funding init with donation amount */
export const completeFundingInitWithDonation = async (page: Page, amount: number) => {
  await clickToggleDonationInput(page)
  await enterDonationAmount(page, amount)
  await clickContinueFromInit(page)
}

/** Complete funding init with reward selection */
export const completeFundingInitWithReward = async (page: Page, rewardIndex = 0) => {
  await clickAddReward(page, rewardIndex)
  await clickContinueFromInit(page)
}

/** Complete funding details (comment + optional email) */
export const completeFundingDetails = async (page: Page, options: FundingDetailsOptions) => {
  await enterComment(page, options.comment)

  if (options.email) {
    await enterEmail(page, options.email)
  }

  await clickContinueFromDetails(page)
}

/** Get Lightning invoice from UI (navigates to payment page and copies invoice) */
export const getLightningInvoice = async (page: Page): Promise<string> => {
  // Should already be on lightning payment page
  const invoice = await clickCopyLightningInvoice(page)
  return invoice
}

/** Get Onchain address and amount from UI (switches to onchain, downloads refund, copies address)
 *
 * Parses the BIP21 URI to extract both address and the exact payment amount (including all fees).
 * Format: bitcoin:ADDRESS?amount=0.00063000
 */
export const getOnchainAddress = async (page: Page): Promise<{ address: string; amountSats: number }> => {
  // Switch to onchain tab (goes to prompt page)
  await clickOnchainTab(page)

  // Download refund file (navigates to QR page)
  await clickDownloadAndContinue(page)

  // Wait for QR page to load - button visibility ensures page is ready
  await page.waitForSelector('#copy-onchain-address-button', { state: 'visible', timeout: 10000 })

  // Copy BIP21 URI
  const bip21Uri = await clickCopyOnchainAddress(page)

  // Parse BIP21 URI to get address and amount
  // Format: bitcoin:ADDRESS?amount=0.00063365
  const [bitcoinPart, queryPart] = bip21Uri.split('?')
  const address = bitcoinPart.split(':')[1] || ''

  // Parse amount parameter (in BTC string format)
  const amountMatch = queryPart?.match(/amount=([0-9.]+)/)
  const amountBtcString = amountMatch ? amountMatch[1] : '0'

  // Convert BTC string to satoshis using string manipulation to avoid floating point errors
  // Remove decimal point and pad/trim to get satoshis
  // Example: "0.00063365" -> "63365" sats
  const [wholePart, decimalPart = ''] = amountBtcString.split('.')
  // BTC has 8 decimal places, so pad or trim decimal part to 8 digits
  const paddedDecimal = decimalPart.padEnd(8, '0').substring(0, 8)
  // Combine whole part and decimal part as satoshis
  const amountSats = parseInt(wholePart + paddedDecimal, 10)

  console.log(`[DEBUG] BIP21 URI: ${bip21Uri}`)
  console.log(`[DEBUG] Parsed BTC: ${amountBtcString}`)
  console.log(`[DEBUG] Converted to sats: ${amountSats}`)

  return { address, amountSats }
}

/** Complete full Lightning donation flow (from init to getting invoice) */
export const completeLightningDonation = async (page: Page, amount: number, comment: string): Promise<string> => {
  await completeFundingInitWithDonation(page, amount)
  await completeFundingDetails(page, { comment })

  // Should now be on lightning payment page
  const invoice = await getLightningInvoice(page)

  return invoice
}

/** Complete full Lightning reward flow (from init to getting invoice) */
export const completeLightningReward = async (
  page: Page,
  comment: string,
  email: string,
  rewardIndex = 0,
): Promise<string> => {
  await completeFundingInitWithReward(page, rewardIndex)
  await completeFundingDetails(page, { comment, email })

  // Should now be on lightning payment page
  const invoice = await getLightningInvoice(page)

  return invoice
}

/** Complete full Onchain donation flow (from init to getting address and amount) */
export const completeOnchainDonation = async (
  page: Page,
  amount: number,
  comment: string,
): Promise<{ address: string; amountSats: number }> => {
  await completeFundingInitWithDonation(page, amount)
  await completeFundingDetails(page, { comment })

  // Should now be on lightning payment page, switch to onchain
  const { address, amountSats } = await getOnchainAddress(page)

  return { address, amountSats }
}

/** Complete full Onchain reward flow (from init to getting address and amount) */
export const completeOnchainReward = async (
  page: Page,
  comment: string,
  email: string,
  rewardIndex = 0,
): Promise<{ address: string; amountSats: number }> => {
  await completeFundingInitWithReward(page, rewardIndex)
  await completeFundingDetails(page, { comment, email })

  // Should now be on lightning payment page, switch to onchain
  const { address, amountSats } = await getOnchainAddress(page)

  return { address, amountSats }
}
