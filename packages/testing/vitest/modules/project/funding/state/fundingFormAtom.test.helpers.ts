// Import FundFormType from the atom file
import { SATOSHIS_IN_BTC } from '../../../../../../../src/shared/constants'
import { ProjectRewardFragment, RewardCurrency } from '../../../../../../../src/types'
import { centsToDollars, dollarsToCents } from '../../../../../../../src/utils'

/** Calculate expected rewards cost breakdown */
export const calculateExpectedRewardCosts = (
  rewardsByIDAndCount: { [key: string]: number } | undefined,
  rewards: ProjectRewardFragment[],
  rewardCurrency: RewardCurrency,
  usdRate: number,
) => {
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
          totalCostInUsdCent += Math.round(dollarsToCents((currentRewardTotalCost / SATOSHIS_IN_BTC) * usdRate))
        } else {
          totalCostInUsdCent += currentRewardTotalCost
          totalCostInSatoshi += Math.round((centsToDollars(currentRewardTotalCost) / usdRate) * SATOSHIS_IN_BTC)
        }
      }
    })
  }

  return {
    satoshi: totalCostInSatoshi,
    usdCent: totalCostInUsdCent,
    base: baseCostTotal,
  }
}

/** Calculate expected tip breakdown */
export const calculateExpectedTip = (
  donationAmount: number,
  rewardsCostSatoshi: number,
  geyserTipPercent: number,
  usdRate: number,
) => {
  const tipBaseSats = donationAmount + rewardsCostSatoshi
  const tipSats = geyserTipPercent > 0 ? Math.round((tipBaseSats * geyserTipPercent) / 100) : 0
  const tipUsdCent = tipSats > 0 && usdRate > 0 ? Math.round(dollarsToCents((tipSats / SATOSHIS_IN_BTC) * usdRate)) : 0

  return {
    satoshi: tipSats,
    usdCent: tipUsdCent,
  }
}

/** Calculate expected total satoshis */
export const calculateExpectedTotalSats = (
  donationAmount: number,
  shippingCost: number,
  rewardsSats: number,
  subscriptionSats: number,
  tipSats: number,
  usdRate: number, // Needed for shipping conversion
) => {
  const shippingCostSats =
    shippingCost > 0 && usdRate > 0 ? Math.round((centsToDollars(shippingCost) / usdRate) * SATOSHIS_IN_BTC) : 0
  return donationAmount + rewardsSats + subscriptionSats + shippingCostSats + tipSats
}

/** Calculate expected total USD cents (based on final satoshi total) */
export const calculateExpectedTotalUsdCent = (totalSats: number, usdRate: number) => {
  if (totalSats > 0 && usdRate > 0) {
    return Math.round(dollarsToCents((totalSats / SATOSHIS_IN_BTC) * usdRate))
  }

  return 0
}

// Add other helper functions if needed, e.g., for subscription cost calculation if complex
