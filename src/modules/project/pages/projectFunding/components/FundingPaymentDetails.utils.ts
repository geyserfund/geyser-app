import type {
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  FundingContributionPaymentDetailsFragment,
} from '@/types/index.ts'

export type FundingPaymentDetailsWithAmountDue =
  | ContributionLightningToRskSwapPaymentDetailsFragment
  | ContributionOnChainToRskSwapPaymentDetailsFragment

/** Returns the first available funding payment details, prioritizing on-chain over lightning. */
export const getFirstFundingPaymentDetails = (
  fundingPaymentDetails: FundingContributionPaymentDetailsFragment,
): FundingPaymentDetailsWithAmountDue | undefined =>
  fundingPaymentDetails.onChainToRskSwap ?? fundingPaymentDetails.lightningToRskSwap ?? undefined
