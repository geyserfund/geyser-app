import { gql } from '@apollo/client';

export const QUERY_GET_FUNDING = gql`
query GetFundingTx($id: BigInt!) {
    fundingTx(id: $id) {
      id
      invoiceId
      paymentRequest
      amount
      status
      comment
      media
      paidAt
      onChain
      funder {
        user {
          twitterHandle
          imageUrl
          username
          id
        }
      }
    }
  }
`;

export const QUERY_GET_FUNDING_STATUS = gql`
query GetFundingTxStatus($id: BigInt!) {
    fundingTx(id: $id) {
      status
  }
}
`;
