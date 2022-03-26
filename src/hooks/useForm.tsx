import { useState } from 'react';
import { IProjectReward, IRewardCount } from '../interfaces';

export interface IFundForm {
	donationAmount: number;
	rewardAmount: number;
	amount: number;
	comment: string;
	anonymous: boolean;
	location: string;
	rewards: {[key:string]:number};
}

export interface IuseFundStateProps {
	rewards?: IProjectReward[]
}

export const useFundState = ({rewards}: IuseFundStateProps) => {
	const [state, _setState] = useState<IFundForm>({
		donationAmount: 0,
		rewardAmount: 0,
		amount: 0,
		comment: '',
		anonymous: true,
		location: '',
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
		let rewardAmount = 0;
		if (rewards) {
			Object.keys(newRewards).map((value:string) => {
				const id = parseInt(value, 10);
				const reward = rewards.find((reward: IProjectReward) => reward.id === id);
				if (reward && reward.id) {
					rewardAmount += reward.price * newRewards[value];
				}
			});
		}

		const newState = {...state, rewards: newRewards, rewardAmount};
		_setState(newState);
	};

	console.log('checking state', state);
	return {state, setTarget, setState, updateReward};
};
