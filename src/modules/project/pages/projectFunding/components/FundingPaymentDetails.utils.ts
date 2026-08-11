import type {
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  ContributionStrikePaymentDetailsFragment,
  FundingContributionPaymentDetailsFragment,
} from '@/types/index.ts'

export type FundingPaymentDetailsWithAmountDue =
  | ContributionLightningToRskSwapPaymentDetailsFragment
  | ContributionOnChainToRskSwapPaymentDetailsFragment
  | ContributionStrikePaymentDetailsFragment

/** Returns the first available funding payment details, prioritizing on-chain over lightning. */
export const getFirstFundingPaymentDetails = (
  fundingPaymentDetails: FundingContributionPaymentDetailsFragment,
): FundingPaymentDetailsWithAmountDue | undefined =>
  (fundingPaymentDetails.strikeOnChain?.address ? fundingPaymentDetails.strikeOnChain : undefined) ??
  (fundingPaymentDetails.strikeLightning?.paymentRequest ? fundingPaymentDetails.strikeLightning : undefined) ??
  (fundingPaymentDetails.strike?.paymentId ? fundingPaymentDetails.strike : undefined) ??
  fundingPaymentDetails.onChainToRskSwap ??
  fundingPaymentDetails.lightningToRskSwap ??
  undefined
