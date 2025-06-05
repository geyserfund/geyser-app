// Import FundFormType from the atom file
import { ProjectRewardFragment, RewardCurrency } from '../../../../../../../src/types'
import type {
  BitcoinQuote,
  ProjectReward,
  ProjectShippingConfigType,
  ProjectShippingRate,
} from '../../../../../../../src/types/generated/graphql.ts'
import { convertAmount } from '../../../../../../../src/utils'

type CalculateExpectedRewardCostsArgs = {
  rewardsByIDAndCount: { [key: string]: number } | undefined
  rewards: ProjectRewardFragment[]
  rewardCurrency: RewardCurrency
  bitcoinQuote: BitcoinQuote
}

/** Calculate expected rewards cost breakdown */
export const calculateExpectedRewardCosts = ({
  rewardsByIDAndCount,
  rewards,
  rewardCurrency,
  bitcoinQuote,
}: CalculateExpectedRewardCostsArgs) => {
  let totalCostInSatoshi = 0
  let totalCostInUsdCent = 0
  let baseCostTotal = 0

  if (rewards && rewardsByIDAndCount) {
    Object.keys(rewardsByIDAndCount).forEach((rewardID: string) => {
      const reward = rewards.find((r) => r.id.toString() === rewardID)
      const count = rewardsByIDAndCount[rewardID]

      if (reward && count && count > 0) {
        const currentRewardTotalCost = reward.cost * count
        baseCostTotal += currentRewardTotalCost

        if (rewardCurrency === RewardCurrency.Btcsat) {
          totalCostInSatoshi += currentRewardTotalCost
          totalCostInUsdCent += convertAmount.satsToUsdCents({ sats: currentRewardTotalCost, bitcoinQuote })
        } else {
          totalCostInUsdCent += currentRewardTotalCost
          totalCostInSatoshi += convertAmount.usdCentsToSats({ usdCents: currentRewardTotalCost, bitcoinQuote })
        }
      }
    })
  }

  return {
    sats: totalCostInSatoshi,
    usdCents: totalCostInUsdCent,
    base: baseCostTotal,
  }
}

export const DEFAULT_COUNTRY_CODE = 'DEFAULT'

type CalculateExpectedShippingCostArgs = {
  rewards?: Pick<ProjectReward, 'id' | 'hasShipping' | 'shippingConfig'>[]
  rewardsByIDAndCount?: Record<string, number>
  shippingCountry?: string
  bitcoinQuote: BitcoinQuote
}

/**
 * Calculates the expected shipping cost based on the provided rewards, counts, and shipping information.
 * This function mirrors the logic in `shippingCostAtom`.
 */
export const calculateExpectedShippingCost = ({
  rewards,
  rewardsByIDAndCount,
  shippingCountry,
  bitcoinQuote,
}: CalculateExpectedShippingCostArgs): { sats: number; usdCents: number } => {
  const response = { sats: 0, usdCents: 0 }

  if (rewards && rewardsByIDAndCount) {
    Object.keys(rewardsByIDAndCount).forEach((rewardID: string) => {
      const reward = rewards.find((r) => r.id.toString() === rewardID)
      const count = rewardsByIDAndCount[rewardID]
      const country = shippingCountry || DEFAULT_COUNTRY_CODE

      if (!reward || !count || !(count > 0) || !reward.hasShipping) return

      const { shippingConfig } = reward
      if (!shippingConfig) return

      const { shippingRates, type: shippingType } = shippingConfig
      if (!shippingRates) return

      const defaultRate = shippingRates.find((rate) => rate.country === DEFAULT_COUNTRY_CODE)
      if (!defaultRate) return // Should not happen if data is sane

      const countryRateCandidate = shippingRates.find((rate) => rate.country === country)

      let effectiveRate: Pick<ProjectShippingRate, 'baseRate' | 'incrementRate'> = defaultRate
      if (countryRateCandidate) {
        effectiveRate = countryRateCandidate.sameAsDefault ? defaultRate : countryRateCandidate
      }

      const { baseRate, incrementRate } = effectiveRate

      if (shippingType === ('FLAT' as ProjectShippingConfigType)) {
        response.usdCents += baseRate
      } else if (shippingType === ('PER_UNIT' as ProjectShippingConfigType)) {
        response.usdCents += baseRate * count
      } else if (shippingType === ('INCREMENTAL' as ProjectShippingConfigType)) {
        // Incremental cost only applies if count > 1
        response.usdCents += baseRate + (count > 1 ? incrementRate * (count - 1) : 0)
      }
    })
  }

  if (bitcoinQuote && response.usdCents > 0) {
    response.sats = convertAmount.usdCentsToSats({
      usdCents: response.usdCents,
      bitcoinQuote,
    })
  } else {
    response.sats = 0
  }

  return response
}

type CalculateExpectedTipArgs = {
  donationAmount: number
  rewardsCostSatoshi: number
  shippingCostSats?: number
  geyserTipPercent: number
  bitcoinQuote: BitcoinQuote
}

/** Calculate expected tip breakdown */
export const calculateExpectedTip = ({
  donationAmount,
  rewardsCostSatoshi,
  shippingCostSats = 0,
  geyserTipPercent,
  bitcoinQuote,
}: CalculateExpectedTipArgs) => {
  const tipBaseSats = donationAmount + rewardsCostSatoshi + shippingCostSats
  const tipSats = geyserTipPercent > 0 ? Math.round((tipBaseSats * geyserTipPercent) / 100) : 0
  const tipUsdCent =
    tipSats > 0 && bitcoinQuote.quote > 0 ? convertAmount.satsToUsdCents({ sats: tipSats, bitcoinQuote }) : 0

  return {
    sats: tipSats,
    usdCents: tipUsdCent,
  }
}

type CalculateExpectedTotalSatsArgs = {
  donationAmount?: number
  shippingCostSats?: number
  rewardsSats?: number
  subscriptionSats?: number
  tipSats?: number
}

/** Calculate expected total satss */
export const calculateExpectedTotalSats = ({
  donationAmount = 0,
  shippingCostSats = 0,
  rewardsSats = 0,
  subscriptionSats = 0,
  tipSats = 0,
}: CalculateExpectedTotalSatsArgs) => donationAmount + rewardsSats + subscriptionSats + shippingCostSats + tipSats

/** Calculate expected total USD cents (based on final sats total) */
export const calculateExpectedTotalUsdCent = (totalSats: number, bitcoinQuote: BitcoinQuote) => {
  return convertAmount.satsToUsdCents({ sats: totalSats, bitcoinQuote })
}

// Add other helper functions if needed, e.g., for subscription cost calculation if complex
