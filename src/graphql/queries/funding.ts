import { gql } from '@apollo/client';

export const QUERY_GET_FUNDING = gql`
query GetFundingTx($fundingTxId: BigInt!) {
    getFundingTx(fundingTxId: $fundingTxId) {
      id
      invoiceId
      paymentRequest
      amount
      paid
      canceled
    }
  }
`;
