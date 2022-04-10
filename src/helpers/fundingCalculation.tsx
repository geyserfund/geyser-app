import { useBtcContext } from '../context/btc';
import { IFundForm } from '../hooks';

export const useFundCalc = (state: IFundForm) => {
	const {btcRate} = useBtcContext();

	const getTotalAmount = (type: 'sats' | 'dollar', name: string) => {
		const shippingAmount = name === 'day-of-genensis' ? 0 : getShippingCost();

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
			return Math.round(0.015 / btcRate);
		}

		return Math.round(0.060 / btcRate);
	};

	const getRewardsNumber = () => {
		let totalRewards = 0;
		Object.keys(state.rewards).map(key => {
			totalRewards += state.rewards[key];
		});
		return totalRewards;
	};

	return {getTotalAmount, getShippingCost, getRewardsNumber, btcRate};
};

