import { useBtcContext } from '../context/btc'
import { __production__ } from '../shared/constants'
import { IFundForm } from '../shared/hooks'
import { Satoshis, USDCents } from '../types'
import { RewardCurrency } from '../types/generated/graphql'
import { hasShipping } from '../utils'
import { useBTCConverter } from './useBTCConverter'

const nationalShippingCost = __production__ ? 15 : 0.015
const internationalShippingCost = __production__ ? 60 : 0.06

export const useFundCalc = (state: IFundForm) => {
  const { btcRate } = useBtcContext()
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const getTotalAmount = (type: 'sats' | 'dollar', projectName = '') => {
    const shippingAmount = hasShipping(projectName) ? getShippingCost() : 0

    if (type === 'sats') {
      const rewardsCost =
        state.rewardCurrency === RewardCurrency.Usdcent
          ? getSatoshisFromUSDCents(state.rewardsCost as USDCents)
          : state.rewardsCost

      return Math.round(rewardsCost) + state.donationAmount + shippingAmount
    }

    const donationDollarAmount = Math.round(getUSDAmount((state.donationAmount + shippingAmount) as Satoshis))

    const rewardsDollarCost =
      state.rewardCurrency === RewardCurrency.Usdcent
        ? state.rewardsCost / 100
        : getUSDAmount(state.rewardsCost as Satoshis)

    return parseFloat((donationDollarAmount + rewardsDollarCost).toFixed(2))
  }

  const getShippingCost = () => {
    if (state.rewardsCost === 0) {
      return 0
    }

    if (state.shippingDestination === 'national') {
      return Math.round(nationalShippingCost / btcRate)
    }

    return Math.round(internationalShippingCost / btcRate)
  }

  const getRewardsQuantity = () => {
    return Object.values(state.rewardsByIDAndCount || {}).reduce((totalCount, current) => totalCount + current, 0)
  }

  return {
    getTotalAmount,
    getShippingCost,
    getRewardsQuantity,
    btcRate,
  }
}
