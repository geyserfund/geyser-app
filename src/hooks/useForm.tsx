import { useContext, useState } from 'react';
import { ShippingDestination, shippingTypes } from '../constants';
import { AuthContext } from '../context';

import { IProjectReward, IRewardCount } from '../interfaces';

export interface IFundForm {
	donationAmount: number;
	rewardsCost: number;
	amount: number;
	comment: string;
	anonymous: boolean;
	shippingDestination: ShippingDestination;
	shippingCost: number;
	email: string;
	rewards: {[key:string]:number};
}

export interface IuseFundStateProps {
	rewards?: IProjectReward[]
}

export const useFundState = ({rewards}: IuseFundStateProps) => {
	const { user } = useContext(AuthContext);

	const intialState = {
		donationAmount: 0,
		rewardsCost: 0,
		amount: 0,
		comment: '',
		shippingDestination: shippingTypes.national,
		shippingCost: 0,
		anonymous: !(user && user.connectedTwitter),
		email: '',
		rewards: {},
	};

	const [state, _setState] = useState<IFundForm>(intialState);
	const setTarget = (event: any) => {
		const {name, value} = event.target;
		const newState = {...state, [name]: value};
		_setState(newState);
	};

	const setState = (name: string, value: any) => {
		const newState = {...state, [name]: value};
		_setState(newState);
	};

	const updateReward = ({id, count}:IRewardCount) => {
		const newRewards = {...state.rewards, [`${id}`]: count};
		let rewardsCost = 0;
		if (rewards) {
			Object.keys(newRewards).map((value:string) => {
				const id = parseInt(value, 10);
				const reward = rewards.find((reward: IProjectReward) => reward.id === id);
				if (reward && reward.id) {
					rewardsCost += reward.cost * newRewards[value];
				}
			});
		}

		console.log('chekcing rewards and rewards cost', newRewards, rewardsCost);
		const newState = {...state, rewards: newRewards, rewardsCost};
		_setState(newState);
	};

	const resetForm = () => {
		_setState(intialState);
	};

	return {state, setTarget, setState, updateReward, resetForm};
};
