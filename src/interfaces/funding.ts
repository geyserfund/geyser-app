import { ShippingDestination } from '../constants';

export interface IFundingTx {
   id: string;
   invoiceId: string;
   comment: string;
   status: string;
   amount: number;
   paymentRequest: string;
   address: string;
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
    shippingDestination: ShippingDestination;
    comment: string | null;
    anonymous: boolean;
    email: string;
}
