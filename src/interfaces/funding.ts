export interface IFundingTx {
    id: string;
   invoiceId: string;
   paid: boolean;
   amount: number;
   paymentRequest: string;
   canceled: boolean;
}
