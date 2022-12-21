import { gql } from '@apollo/client';

export const FUNDING_TX_CONFIRMED_SUBSCRIPTION = gql`
  subscription FundingTxConfirmedSubscription {
    fundingTxConfirmed {
      fundingTx {
        id
        comment
        amount
        funder {
          id
          user {
            id
            username
          }
        }
        paidAt
        onChain
        media
        sourceResource {
          ... on Project {
            id
            name
            title
            image
          }
          ... on Entry {
            id
            image
          }
        }
      }
    }
  }
`;
