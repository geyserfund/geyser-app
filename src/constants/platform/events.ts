import { IProjectType, ISelectOption } from '../../interfaces';

export const fundingStages: {
  loading: IFundingStages;
  initial: IFundingStages;
  form: IFundingStages;
  started: IFundingStages;
  completed: IFundingStages;
  canceled: IFundingStages;
} = {
  loading: 'loading',
  initial: 'initial',
  form: 'form',
  started: 'started',
  completed: 'completed',
  canceled: 'canceled',
};

export const stageList: IFundingStages[] = [
  'loading',
  'initial',
  'form',
  'started',
  'completed',
  'canceled',
];

export type IFundingStages =
  | 'loading'
  | 'initial'
  | 'form'
  | 'started'
  | 'completed'
  | 'canceled';

export const authModalStates: {
  loading: IAuthModalState;
  initial: IAuthModalState;
  lnurl: IAuthModalState;
  connect: IAuthModalState;
  completed: IAuthModalState;
  manage: IAuthModalState;
} = {
  loading: 'loading',
  initial: 'initial',
  lnurl: 'lnurl',
  connect: 'connect',
  completed: 'completed',
  manage: 'manage',
};

export type IAuthModalState =
  | 'loading'
  | 'initial'
  | 'lnurl'
  | 'completed'
  | 'connect'
  | 'manage';

export const projectTypes = {
  donation: 'donation' as IProjectType,
  reward: 'reward' as IProjectType,
  grant: 'grant' as IProjectType,
};

export type FundingTxStatus = 'unpaid' | 'paid' | 'canceled' | 'pending';

export type ShippingDestination = 'national' | 'international';

export const shippingTypes = {
  national: 'national' as ShippingDestination,
  international: 'international' as ShippingDestination,
};

export const SelectCountryOptions: ISelectOption[] = [
  {
    label: 'Deliver inside the USA',
    value: 'national',
  },
  {
    label: 'Deliver outside the USA',
    value: 'international',
  },
];
