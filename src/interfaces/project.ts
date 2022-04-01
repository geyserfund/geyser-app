import { BadgeVariant } from '../components/ui';

// TODO: there has to be a better way to deal with enums false flag unused-var
export enum EProjectType {
    // eslint-disable-next-line no-unused-vars
    reward = 'reward',
    // eslint-disable-next-line no-unused-vars
    grant = 'grant',
    // eslint-disable-next-line no-unused-vars
    donation = 'donation'
}

export interface IProject {
    id: string;
    title: string;
    name: string;
    description: string;
    type: EProjectType;
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
