import { IProject } from '../../interfaces';

export const project1: IProject = {
  id: '1',
  title: 'Running With Bitcoin',
  name: 'runningWithBitcoin',
  description: `Project Description text`,
  type: 'grant',
  balance: 0,
  fundingGoal: 0,
  createdAt: '',
  updatedAt: '',
  expiresAt: '',
  active: false,
  ownerConfirmed: '',
  fundsClaimed: '',
  creationConfirmed: '',
  media: [],
  owners: [],
  ambassadors: [],
  funders: [],
  sponsors: [],
  grantees: [],
  fundingTxs: [],
};

export const projectListItems: IProject[] = [project1];
