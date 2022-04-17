import { IParticipant, IFunder, ISponsor, IGrantee } from './participant';

export type IProjectType = 'reward' | 'grant' | 'donation'

export interface IProject {
    id: string;
    title: string;
    name: string;
    description: string;
    type: IProjectType;
    balance: number;
    fundingGoal: number;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    active: boolean;
    ownerConfirmed: string;
    fundsClaimed: string;
    creationConfirmed: string;
    media: string[];
    owners: IParticipant[];
    ambassadors: IParticipant[];
    funders: IFunder[];
    sponsors: ISponsor[];
    grantees: IGrantee[];
    fundingTxs: IProjectFunding[];
    rewards?: IProjectReward[]
}

export interface IProjectReward {
    id: number;
    cost: number;
    currency: string;
    name: string;
    description: string;
    backers: number;
}

export interface IProjectFunding {
    id: number;
    funder: IFunder;
    amount:string;
    comment:string;
    paidAt:string;
    onChain: boolean;
}

export interface IProjectDetail {
    problem: string;
    idea: string;
    blocks: IProjectBlock[];
    ownerIntro: string;
    images?: string[];
}

export interface IProjectBlock {
    key: string;
    title: string;
    body: string[];
    images?: string[];
    blockType: string;
}

export interface IProjectUpdate {
    updateTitle: string;
    date: number;
    tweet?: string;
    type: string;
    bodyTitle?: string;
    body?: string[];
    images?: string[];
}

export interface IRewardCount {
    id: number;
    count: number;
}
