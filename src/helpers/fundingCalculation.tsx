import { __production__ } from '../constants';
import { useBtcContext } from '../context/btc';
import { IFundForm } from '../hooks';
import { RewardCurrency } from '../types/generated/graphql';
import { hasShipping } from '../utils';
import { useBTCConverter } from './useBTCConverter';

const nationalShippingCost = __production__ ? 15 : 0.015;
const internationalShippingCost = __production__ ? 60 : 0.06;

export const useFundCalc = (state: IFundForm) => {
  const { btcRate } = useBtcContext();
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter();

  const getTotalAmount = (type: 'sats' | 'dollar', projectName: string) => {
    const shippingAmount = hasShipping(projectName) ? getShippingCost() : 0;

    if (type === 'sats') {
      const rewardsCost =
        state.rewardCurrency === RewardCurrency.Usdcent
          ? getSatoshisFromUSDCents(state.rewardsCost)
          : state.rewardsCost;

      return Math.round(rewardsCost) + state.donationAmount + shippingAmount;
    }

    const donationDollarAmount = Math.round(
      getUSDAmount(state.donationAmount + shippingAmount),
    );

    const rewardsDollarCost =
      state.rewardCurrency === RewardCurrency.Usdcent
        ? state.rewardsCost / 100
        : getUSDAmount(state.rewardsCost) / 100;

    return donationDollarAmount + rewardsDollarCost;
  };

  const getShippingCost = () => {
    if (state.rewardsCost === 0) {
      return 0;
    }

    if (state.shippingDestination === 'national') {
      return Math.round(nationalShippingCost / btcRate);
    }

    return Math.round(internationalShippingCost / btcRate);
  };

  const getRewardsQuantity = () => {
    return Object.values(state.rewardsByIDAndCount || {}).reduce(
      (totalCount, current) => totalCount + current,
      0,
    );
  };

  return {
    getTotalAmount,
    getShippingCost,
    getRewardsQuantity,
    btcRate,
  };
};
