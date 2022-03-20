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
