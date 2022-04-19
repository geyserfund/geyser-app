import { NODE_ENV } from '../constants';
import { useBtcContext } from '../context/btc';
import { IFundForm } from '../hooks';

const nationalShippingCost = NODE_ENV === 'production' ? 15 : 0.015;
const internationalShippingCost = NODE_ENV === 'production' ? 60 : 0.060;

export const useFundCalc = (state: IFundForm) => {
	const {btcRate} = useBtcContext();

	const getTotalAmount = (type: 'sats' | 'dollar', name: string) => {
		const shippingAmount = (name === 'day-of-genesis' || name === 'lightning-rebel') ? 0 : getShippingCost();

		if (type === 'sats') {
			return Math.round(state.rewardsCost / btcRate) + state.donationAmount + shippingAmount;
		}

		const donationAmount = Math.round((state.donationAmount + shippingAmount) * btcRate);

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
		let totalRewards = 0;
		Object.keys(state.rewards).map(key => {
			totalRewards += state.rewards[key];
		});
		return totalRewards;
	};

	return {getTotalAmount, getShippingCost, getRewardsQuantity, btcRate};
};

