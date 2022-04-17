import { ShippingDestination } from '../constants';
import { IFunder } from './participant';

export interface IFundingTx {
   id: string;
   uuid: string;
   invoiceId: string;
   comment: string;
   status: string;
   amount: number;
   paymentRequest: string;
   address: string;
   canceled: boolean;
   funder: IFunder;
   paidAt: string;
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
    anonymous: boolean;
    email: string;
}
