/* eslint-disable complexity */
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { useGoalsAtom } from '@/modules/project/hooks/useProjectAtom'
import { getProjectMatchingAmountBreakdown } from '@/modules/project/matching/utils/projectMatching.ts'
import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom'
import { ContributionFeesFragment, PaymentFeePayer, PaymentFeeType } from '@/types/index.ts'
import { convertAmount } from '@/utils'

import { FundingPaymentDetailsWithAmountDue, getFirstFundingPaymentDetails } from './FundingPaymentDetails.utils.ts'
import type { FundingSummaryContentData } from './FundingSummaryContent.tsx'
import { FundingSummaryContent } from './FundingSummaryContent.tsx'

type FundingContributionSummaryProps = {
  amountDueSats?: number
  disableCollapse?: boolean
  paymentDetails?: FundingPaymentDetailsWithAmountDue
  referenceCode?: string | null
}

const networkFeeTypesExcludedFromSummary = [PaymentFeeType.Tip, PaymentFeeType.Shipping]

const reduceContributorFeesByType = (feeType: PaymentFeeType) => (total: number, fee: ContributionFeesFragment) => {
  if (fee.feePayer === PaymentFeePayer.Contributor && fee.feeType === feeType) {
    return total + fee.feeAmount
  }

  return total
}

const reduceContributorNetworkFees = (total: number, fee: ContributionFeesFragment) => {
  if (
    fee.feePayer === PaymentFeePayer.Contributor &&
    fee.feeType &&
    !networkFeeTypesExcludedFromSummary.includes(fee.feeType)
  ) {
    return total + fee.feeAmount
  }

  return total
}

/** FundingContributionSummary adapts backend contribution/payment data into the shared funding summary UI. */
export const FundingContributionSummary = ({
  amountDueSats,
  disableCollapse,
  paymentDetails,
  referenceCode,
}: FundingContributionSummaryProps) => {
  const { t } = useTranslation()

  const fundingContribution = useAtomValue(fundingContributionAtom)
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const fallbackBitcoinQuote = useAtomValue(bitcoinQuoteAtom)
  const { inProgressGoals } = useGoalsAtom()

  const activePaymentDetails = paymentDetails || getFirstFundingPaymentDetails(fundingPaymentDetails)
  const bitcoinQuote = fundingContribution.bitcoinQuote || fallbackBitcoinQuote
  const { order } = fundingContribution
  const totalSats = amountDueSats || activePaymentDetails?.amountDue || fundingContribution.amount
  const tipSats = activePaymentDetails?.fees?.reduce(reduceContributorFeesByType(PaymentFeeType.Tip), 0) || 0
  const networkFeeSats = activePaymentDetails?.fees?.reduce(reduceContributorNetworkFees, 0) || 0
  const currentGoal =
    fundingContribution.projectGoalId && inProgressGoals.length > 0
      ? inProgressGoals.find((goal) => goal.id === fundingContribution.projectGoalId)
      : undefined
  const matchingAvailableAmount = fundingContribution.matching
    ? getProjectMatchingAmountBreakdown({
        amount: fundingContribution.matching.remainingCapAmount,
        referenceCurrency: fundingContribution.matching.referenceCurrency,
        bitcoinQuote,
      })
    : null

  const summaryData: FundingSummaryContentData = {
    currentGoalTitle: currentGoal?.title,
    donation:
      fundingContribution.donationAmount > 0
        ? {
            label: t('Donation'),
            sats: fundingContribution.donationAmount,
            usdCents: convertAmount.satsToUsdCents({ sats: fundingContribution.donationAmount, bitcoinQuote }),
          }
        : undefined,
    matchingAmount:
      fundingContribution.matching && fundingContribution.matchedAmountSats > 0
        ? {
            label: t('Matched amount'),
            sats: fundingContribution.matchedAmountSats,
            usdCents: fundingContribution.matchedAmountUsdCent,
          }
        : undefined,
    matchingAvailable:
      matchingAvailableAmount && matchingAvailableAmount.sats > 0
        ? {
            label: t('Matching available'),
            sats: matchingAvailableAmount.sats,
            usdCents: matchingAvailableAmount.usdCents,
          }
        : undefined,
    networkFee:
      networkFeeSats > 0
        ? {
            sats: networkFeeSats,
            usdCents: convertAmount.satsToUsdCents({ sats: networkFeeSats, bitcoinQuote }),
          }
        : undefined,
    productItems:
      order?.items.map((item) => ({
        image: item.item.images[0],
        key: item.item.id,
        label: `${item.item.name} (x${item.quantity})`,
      })) || [],
    productsCost: order?.itemsTotalInSats
      ? {
          sats: order.itemsTotalInSats,
          usdCents: convertAmount.satsToUsdCents({ sats: order.itemsTotalInSats, bitcoinQuote }),
        }
      : undefined,
    referenceCode,
    shippingCost: order?.shippingFeeTotalInSats
      ? {
          sats: order.shippingFeeTotalInSats,
          usdCents: convertAmount.satsToUsdCents({ sats: order.shippingFeeTotalInSats, bitcoinQuote }),
        }
      : undefined,
    tip:
      tipSats > 0
        ? {
            label: t('Geyser tip'),
            sats: tipSats,
            usdCents: convertAmount.satsToUsdCents({ sats: tipSats, bitcoinQuote }),
          }
        : undefined,
    total: {
      sats: totalSats,
      usdCents: convertAmount.satsToUsdCents({ sats: totalSats, bitcoinQuote }),
    },
  }

  return <FundingSummaryContent data={summaryData} disableCollapse={disableCollapse} />
}
