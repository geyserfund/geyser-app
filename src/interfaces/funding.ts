// eslint-disable-next-line no-warning-comments
// TODO: make this type work
// export type FundingTxStatus = 'unpaid' | 'paid' | 'canceled' | 'pending'

export enum EShippingDestination {
    // eslint-disable-next-line no-unused-vars
    national = 'national',
    // eslint-disable-next-line no-unused-vars
    international = 'international'
}

export interface IFundingTx {
   id: string;
   invoiceId: string;
   comment: string;
   status: string;
   amount: number;
   paymentRequest: string;
   canceled: boolean;
}

export interface IFundingReward {
    projectRewardId: number;
    cost: number;
    quantity: number;
}

interface IFundingRewardWithoutCost {
    projectRewardId: number;
    quantity: number;
}

export interface IDonationFundingInput {
    projectId: number;
    amount: number;
    comment: string | null;
    anonymous: boolean;
}

export interface IRewardFundingInput {
    projectId: number;
    donationAmount: number | null;
    rewardsCost: number;
    rewards: IFundingRewardWithoutCost[];
    shippingDestination: EShippingDestination;
    comment: string | null;
    anonymous: boolean;
    email: string;
}
