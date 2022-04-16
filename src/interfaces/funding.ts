import { ShippingDestination } from '../constants';

export interface IFundingTx {
   id: string;
   invoiceId: string;
   comment: string;
   gif: string | number;
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

export interface IFundingAmounts {
    total: number;
    shippingCost: number;
    rewardsCost: number;
    donationAmount: number;
}

interface IFundingRewardWithoutCost {
    projectRewardId: number;
    quantity: number;
}

export interface IDonationFundingInput {
    projectId: number;
    donationAmount: number;
    comment: string | null;
    gif: string | number | null;
    anonymous: boolean;
}

export interface IRewardFundingInput {
    projectId: number;
    donationAmount: number | null;
    rewardsCost: number;
    rewards: IFundingRewardWithoutCost[];
    shippingDestination: ShippingDestination;
    shippingCost: number;
    comment: string | null;
    gif: string | number | null;
    anonymous: boolean;
    email: string;
}
