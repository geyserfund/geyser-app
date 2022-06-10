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
      source
      funder {
        user {
          id
          username
          imageUrl
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
