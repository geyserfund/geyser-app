import { recurringFundingModes, RecurringFundingMode } from '@/modules/project/recurring/graphql'
import { centsToDollars, convertAmount } from '@/utils'
import { BitcoinQuote, ProjectMatchingCurrency, ProjectMatchingFragment, ProjectMatchingType } from '@/types'

const PROJECT_MATCHING_BADGE_LABELS: Record<ProjectMatchingType, string> = {
  [ProjectMatchingType.OneToOne]: '2x matching',
}

export const getProjectMatchingBadgeLabel = (matchingType?: ProjectMatchingType | null) => {
  if (!matchingType) {
    return PROJECT_MATCHING_BADGE_LABELS[ProjectMatchingType.OneToOne]
  }

  return PROJECT_MATCHING_BADGE_LABELS[matchingType]
}

export const normalizeProjectMatchingUrl = (url?: string | null) => {
  if (!url) return null

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return null

  const urlWithProtocol = /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`

  try {
    return new URL(urlWithProtocol).toString()
  } catch {
    return null
  }
}

export const formatProjectMatchingFormAmount = ({
  amount,
  referenceCurrency,
}: {
  amount: number
  referenceCurrency: ProjectMatchingCurrency
}) => {
  if (referenceCurrency === ProjectMatchingCurrency.Usdcent) {
    return centsToDollars(amount).toString()
  }

  return amount.toString()
}

export const parseProjectMatchingFormAmount = ({
  value,
  referenceCurrency,
}: {
  value: string
  referenceCurrency: ProjectMatchingCurrency
}) => {
  const numericValue = Number(value.replaceAll(',', '').trim())

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return 0
  }

  if (referenceCurrency === ProjectMatchingCurrency.Usdcent) {
    return Math.round(numericValue * 100)
  }

  return Math.round(numericValue)
}

export const getProjectMatchingAmountBreakdown = ({
  amount,
  referenceCurrency,
  bitcoinQuote,
}: {
  amount: number
  referenceCurrency: ProjectMatchingCurrency
  bitcoinQuote?: BitcoinQuote | null
}) => {
  if (referenceCurrency === ProjectMatchingCurrency.Btcsat) {
    return {
      sats: amount,
      usdCents: convertAmount.satsToUsdCents({ sats: amount, bitcoinQuote }),
    }
  }

  return {
    sats: convertAmount.usdCentsToSats({ usdCents: amount, bitcoinQuote }),
    usdCents: amount,
  }
}

type CalculateProjectMatchingPreviewProps = {
  activeMatching?: ProjectMatchingFragment | null
  bitcoinQuote?: BitcoinQuote | null
  fundingMode: RecurringFundingMode
  donationAmountSats: number
  donationAmountUsdCent: number
  rewardsCostSats: number
  rewardsCostUsdCents: number
  subscriptionCostSats: number
  subscriptionCostUsdCents: number
}

export const calculateProjectMatchingPreview = ({
  activeMatching,
  bitcoinQuote,
  fundingMode,
  donationAmountSats,
  donationAmountUsdCent,
  rewardsCostSats,
  rewardsCostUsdCents,
  subscriptionCostSats,
  subscriptionCostUsdCents,
}: CalculateProjectMatchingPreviewProps) => {
  const emptyResponse = {
    hasActiveMatching: false,
    eligibleAmountSats: 0,
    eligibleAmountUsdCents: 0,
    matchedAmountSats: 0,
    matchedAmountUsdCents: 0,
    totalImpactSats: donationAmountSats,
    totalImpactUsdCents: donationAmountUsdCent,
    remainingMatchingSats: 0,
    remainingMatchingUsdCents: 0,
  }

  if (!activeMatching || activeMatching.matchingType !== ProjectMatchingType.OneToOne) {
    return emptyResponse
  }

  let eligibleAmountSats = 0
  let eligibleAmountUsdCents = 0

  if (fundingMode === recurringFundingModes.oneTime) {
    eligibleAmountSats = donationAmountSats + rewardsCostSats
    eligibleAmountUsdCents = donationAmountUsdCent + rewardsCostUsdCents
  } else if (fundingMode === recurringFundingModes.recurringDonation) {
    eligibleAmountSats = donationAmountSats
    eligibleAmountUsdCents = donationAmountUsdCent
  } else if (fundingMode === recurringFundingModes.membership) {
    eligibleAmountSats = subscriptionCostSats
    eligibleAmountUsdCents = subscriptionCostUsdCents
  }

  const remainingBreakdown = getProjectMatchingAmountBreakdown({
    amount: activeMatching.remainingCapAmount,
    referenceCurrency: activeMatching.referenceCurrency,
    bitcoinQuote,
  })

  const matchedAmountSats =
    activeMatching.referenceCurrency === ProjectMatchingCurrency.Btcsat
      ? Math.min(eligibleAmountSats, remainingBreakdown.sats)
      : convertAmount.usdCentsToSats({
          usdCents: Math.min(eligibleAmountUsdCents, remainingBreakdown.usdCents),
          bitcoinQuote,
        })

  const matchedAmountUsdCents =
    activeMatching.referenceCurrency === ProjectMatchingCurrency.Usdcent
      ? Math.min(eligibleAmountUsdCents, remainingBreakdown.usdCents)
      : convertAmount.satsToUsdCents({
          sats: Math.min(eligibleAmountSats, remainingBreakdown.sats),
          bitcoinQuote,
        })

  return {
    hasActiveMatching: true,
    eligibleAmountSats,
    eligibleAmountUsdCents,
    matchedAmountSats,
    matchedAmountUsdCents,
    totalImpactSats: eligibleAmountSats + matchedAmountSats,
    totalImpactUsdCents: eligibleAmountUsdCents + matchedAmountUsdCents,
    remainingMatchingSats: remainingBreakdown.sats,
    remainingMatchingUsdCents: remainingBreakdown.usdCents,
  }
}
