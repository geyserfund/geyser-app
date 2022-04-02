import { BadgeVariant } from '../components/ui';

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
    active: string;
    ownerConfirmed: string;
    fundsClaimed: string;
    creationConfirmed: string;
    owners: IProjectUser[];
    ambassadors: IProjectUser[];
    funders: IProjectUser[];
    sponsors: IProjectUser[];
    grantees: IGrantee[];
    fundingTxs: IProjectFunding[];
    rewards?: IProjectReward[]
}

export interface IProjectReward {
    id: number;
    cost: number;
    name: string;
    description: string;
    backers: number;
}

export interface IGrantee {
    id: number;
    url: string;
    name: string;
}

export interface IProjectUser {
    user: IUser;
    confirmed: boolean;
}

export interface IUser {
    id: string;
    username: string;
    imageUrl: string;
    URL: string;
    fullName: string;
    twitter: boolean;
    twitterHandle: string;
    badge: BadgeVariant;
    amount: number;
}

export interface IProjectFunding {
    id: number;
    funder: IFunder;
    amount:string;
    comment:string;
    paidAt:string;
}

export interface IFunder {
    user: IUser;
    confirmed: boolean;
    amountFunded: number;
}

export interface IProjectDetail {
    problem: string;
    solution: string;
    blocks: IProjectBlock[];
    ownerIntro: string;
    images?: string[];
}

export interface IProjectBlock {
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

export interface IProjectSponsor {
    user: IUser;
    image: string;
    companyUrl: string;
}

export interface IRewardCount {
    id: number;
    count: number;
}
