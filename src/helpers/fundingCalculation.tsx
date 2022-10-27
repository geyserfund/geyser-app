import { __production__ } from '../constants';
import { useBtcContext } from '../context/btc';
import { IFundForm } from '../hooks';
import { hasShipping } from '../utils';

const nationalShippingCost = __production__ ? 15 : 0.015;
const internationalShippingCost = __production__ ? 60 : 0.06;

export const useFundCalc = (state: IFundForm) => {
  const { btcRate } = useBtcContext();

  const getTotalAmount = (type: 'sats' | 'dollar', name: string) => {
    const shippingAmount = hasShipping(name) ? getShippingCost() : 0;

    /*
     * This code also assumes rewards are only priced in USD. It will need refactoring if we want support for multiple
     * currencies
     */
    if (type === 'sats') {
      return (
        Math.round(state.rewardsCost / btcRate) +
        state.donationAmount +
        shippingAmount
      );
    }

    const donationAmount = Math.round(
      (state.donationAmount + shippingAmount) * btcRate,
    );

    return donationAmount + state.rewardsCost;
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
