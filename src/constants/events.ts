import { ISelectOption } from '../interfaces';

export const fundingStages:{
loading:IFundingStages;
inital:IFundingStages;
form: IFundingStages;
started:IFundingStages;
completed:IFundingStages;
canceled:IFundingStages;
} = {
	loading: 'loading',
	inital: 'inital',
	form: 'form',
	started: 'started',
	completed: 'completed',
	canceled: 'canceled',
};

export const stageList: IFundingStages[] = ['loading', 'inital', 'form', 'started', 'completed', 'canceled'];

export type IFundingStages = 'loading'|'inital' | 'form' | 'started' | 'completed' | 'canceled'

export type IProjectType = 'donation-based'|'reward-based'

export const projectTypes:{
	donation:IProjectType,
	reward: IProjectType
} = {
	donation: 'donation-based',
	reward: 'reward-based',
};

export const SelectCountryOptions:ISelectOption[] = [
	{
		label: 'Inside US',
		value: 'INSIDE_US',
	},
	{
		label: 'Outside US',
		value: 'OUTSIDE_US',
	},
];
