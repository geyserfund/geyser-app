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
      paidAt
      onChain
      funder {
        user {
          twitterHandle
          imageUrl
          username
          id
        }
        badges {
          badge
          description
        }
      }
    }
  }
`;
