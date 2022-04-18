import { ShippingDestination } from '../constants';
import { IFunder } from './participant';

export interface IFundingTx {
   id: string;
   uuid: string;
   invoiceId: string;
   comment: string;
   gif: string | number;
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
    id: number;
    quantity: number;
}

export interface IFundingInput {
    projectId: number;
    anonymous: boolean;
    donationInput?: IDonationFundingInput;
    rewardInput?: IRewardFundingInput;
    metadataInput?: IMetadataFundingInput;
}

export interface IDonationFundingInput {
    donationAmount: number;
}

export interface IRewardFundingInput {
    rewardsCost: number;
    rewards: IFundingRewardWithoutCost[];
    shipping: IShippingFundingInput;
}

export interface IShippingFundingInput {
    destination: ShippingDestination;
    cost: number;
}

export interface IMetadataFundingInput {
    comment?: string;
    email?: string;
    media?: string;
}
