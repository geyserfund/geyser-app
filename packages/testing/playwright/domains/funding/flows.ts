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
  enterComment,
  enterDonationAmount,
  enterEmail,
} from './actions'
import { FundingDetailsOptions } from './types'

/** Complete funding init with donation amount */
export const completeFundingInitWithDonation = async (page: Page, amount: number) => {
  await enterDonationAmount(page, amount)
  await clickContinueFromInit(page)
}

/** Complete funding init with reward selection */
export const completeFundingInitWithReward = async (page: Page, rewardIndex: number = 0) => {
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

/** Get Onchain address from UI (switches to onchain, downloads refund, copies address) */
export const getOnchainAddress = async (page: Page): Promise<string> => {
  // Switch to onchain tab
  await clickOnchainTab(page)
  
  // Download refund file
  await clickDownloadAndContinue(page)
  
  // Copy address
  const bip21Uri = await clickCopyOnchainAddress(page)
  
  // Parse BIP21 URI to get address
  // Format: bitcoin:ADDRESS?amount=X
  const address = bip21Uri.split(':')[1]?.split('?')[0] || ''
  
  return address
}

/** Complete full Lightning donation flow (from init to getting invoice) */
export const completeLightningDonation = async (
  page: Page,
  amount: number,
  comment: string,
): Promise<string> => {
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
  rewardIndex: number = 0,
): Promise<string> => {
  await completeFundingInitWithReward(page, rewardIndex)
  await completeFundingDetails(page, { comment, email })
  
  // Should now be on lightning payment page
  const invoice = await getLightningInvoice(page)
  
  return invoice
}

/** Complete full Onchain donation flow (from init to getting address) */
export const completeOnchainDonation = async (
  page: Page,
  amount: number,
  comment: string,
): Promise<string> => {
  await completeFundingInitWithDonation(page, amount)
  await completeFundingDetails(page, { comment })
  
  // Should now be on lightning payment page, switch to onchain
  const address = await getOnchainAddress(page)
  
  return address
}

/** Complete full Onchain reward flow (from init to getting address) */
export const completeOnchainReward = async (
  page: Page,
  comment: string,
  email: string,
  rewardIndex: number = 0,
): Promise<string> => {
  await completeFundingInitWithReward(page, rewardIndex)
  await completeFundingDetails(page, { comment, email })
  
  // Should now be on lightning payment page, switch to onchain
  const address = await getOnchainAddress(page)
  
  return address
}
