import { BadgeVariant } from '../components/ui';

export interface IProject {
    id: string;
    title: string;
    name: string;
    description: string;
    originUrl: string;
    balance: number;
    fundingGoal: number;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    active: string;
    ownerConfirmed: string;
    fundsClaimed: string;
    creationConfirmed: string;
    creator: IProjectUser;
    owner: IProjectUser;
    ambassadors: IProjectUser[];
    funders: IProjectUser[];
    fundingTxs: IProjectFunding[];
}

export interface IProjectUser {
    user: IUser;
    confirmed: boolean;
}

export interface IUser {
    id: string;
    username: string;
    picture: string;
    URL: string;
    fullName: string;
    twitter: boolean;
    badge: BadgeVariant;
    amount: number;
}

export interface IProjectFunding {
        amount:string;
        comment:string;
        paidAt:string;
        user: IFunder
}

export interface IFunder {
    username: string;
    imageUrl: string;
    twitterHandle: string;
    connectedTwitter: boolean;
}

export interface IProjectDetail {
    problem: string;
    solution: string;
    blocks: IProjectBlock[];
    ownerIntro: string
    images?: string[]
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
