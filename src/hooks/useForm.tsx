import { useState } from 'react';
import { IRewardCount } from '../interfaces';

export interface IFundForm {
	donationAmount: number;
	rewardAmount: number;
	amount: number;
	comment: string;
	anonymous: boolean;
	rewards: {[key:number]:number};
}

export const useFundState = () => {
	const [state, _setState] = useState<IFundForm>({
		donationAmount: 0,
		rewardAmount: 0,
		amount: 0,
		comment: '',
		anonymous: true,
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
		const newState = {...state, rewards: {...state.rewards, [id]: count}};
		_setState(newState);
	};

	console.log('checking state', state);
	return {state, setTarget, setState, updateReward};
};
