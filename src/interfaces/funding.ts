// eslint-disable-next-line no-warning-comments
// TODO: make this type work
// export type FundingTxStatus = 'unpaid' | 'paid' | 'canceled' | 'pending'

export interface IFundingTx {
   id: string;
   invoiceId: string;
   comment: string;
   status: string;
   amount: number;
   paymentRequest: string;
   canceled: boolean;
}

export interface IFundingInput {
    projectId: number,
    donationAmount: number | null,
    rewardsCost: number | null,
    comment: string | null,
    anonymous: boolean,
    email: string | null,
}
