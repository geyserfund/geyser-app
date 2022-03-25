export const fundingStages:{
loading:IFundingStages;
initial:IFundingStages;
form: IFundingStages;
started:IFundingStages;
completed:IFundingStages;
canceled:IFundingStages;
} = {
	loading: 'loading',
	initial: 'initial',
	form: 'form',
	started: 'started',
	completed: 'completed',
	canceled: 'canceled',
};

export const stageList: IFundingStages[] = ['loading', 'initial', 'form', 'started', 'completed', 'canceled'];

export type IFundingStages = 'loading'| 'initial' | 'form' | 'started' | 'completed' | 'canceled'
