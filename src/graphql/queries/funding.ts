import { gql } from '@apollo/client';

export const QUERY_GET_FUNDING = gql`
query GetFundingTx($fundingTxId: BigInt!) {
    getFundingTx(fundingTxId: $fundingTxId) {
      id
      invoiceId
      paymentRequest
      amount
      status
      canceled
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
