import { useState } from 'react';
import { EShippingDestination } from '../interfaces';

const { national } = EShippingDestination;

export interface IFundForm {
	amount: number;
	comment: string;
	anonymous: boolean;
	shippingDestination: EShippingDestination;
	email: string;
	rewards: any[];
}

export const useFundState = () => {
	const [state, _setState] = useState<IFundForm>({
		amount: 0,
		comment: '',
		shippingDestination: national,
		anonymous: true,
		email: '',
		rewards: [],
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

	return {state, setTarget, setState};
};
