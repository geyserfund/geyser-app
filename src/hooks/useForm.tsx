import { useState } from 'react';
import { EShippingDestination } from '../interfaces';

const { national } = EShippingDestination;
import { IProjectReward, IRewardCount } from '../interfaces';

export interface IFundForm {
	donationAmount: number;
	rewardsCost: number;
	amount: number;
	comment: string;
	anonymous: boolean;
	shippingDestination: EShippingDestination;
	email: string;
	rewards: {[key:string]:number};
}

export interface IuseFundStateProps {
	rewards?: IProjectReward[]
}

export const useFundState = ({rewards}: IuseFundStateProps) => {
	const [state, _setState] = useState<IFundForm>({
		donationAmount: 0,
		rewardsCost: 0,
		amount: 0,
		comment: '',
		shippingDestination: national,
		anonymous: true,
		email: '',
		rewards: {},
	});
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
					rewardsCost += reward.price * newRewards[value];
				}
			});
		}

		const newState = {...state, rewards: newRewards, rewardsCost};
		_setState(newState);
	};

	console.log('checking state', state);
	return {state, setTarget, setState, updateReward};
};
