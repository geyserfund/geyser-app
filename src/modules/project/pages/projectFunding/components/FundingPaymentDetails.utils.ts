import type {
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  FundingContributionPaymentDetailsFragment,
} from '@/types/index.ts'

export type FundingPaymentDetailsWithAmountDue =
  | ContributionLightningToRskSwapPaymentDetailsFragment
  | ContributionOnChainToRskSwapPaymentDetailsFragment

export const getFirstFundingPaymentDetails = (
  fundingPaymentDetails: FundingContributionPaymentDetailsFragment,
): FundingPaymentDetailsWithAmountDue | undefined =>
  fundingPaymentDetails.onChainToRskSwap || fundingPaymentDetails.lightningToRskSwap || undefined
