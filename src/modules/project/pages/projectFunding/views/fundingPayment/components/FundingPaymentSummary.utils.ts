import type { FundingPaymentDetailsWithAmountDue } from '@/modules/project/pages/projectFunding/components/FundingPaymentDetails.utils.ts'
import type { FundingContributionPaymentDetailsFragment } from '@/types/index.ts'

import { PaymentMethods } from '../state/paymentMethodAtom.ts'

export const getActiveFundingPaymentDetails = (
  paymentMethod: PaymentMethods | undefined,
  fundingPaymentDetails: FundingContributionPaymentDetailsFragment,
): FundingPaymentDetailsWithAmountDue | undefined => {
  if (paymentMethod === PaymentMethods.onChain) {
    return fundingPaymentDetails.onChainToRskSwap || undefined
  }

  if (paymentMethod === PaymentMethods.lightning) {
    return fundingPaymentDetails.lightningToRskSwap || undefined
  }

  return undefined
}

export const getFundingPaymentAmountDueSats = (
  paymentMethod: PaymentMethods | undefined,
  fundingPaymentDetails: FundingContributionPaymentDetailsFragment,
) => getActiveFundingPaymentDetails(paymentMethod, fundingPaymentDetails)?.amountDue
