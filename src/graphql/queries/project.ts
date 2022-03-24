import { gql } from '@apollo/client';

export const QUERY_GET_PROJECT = gql`
query GetProjectByName($name: String!) {
    getProjectByName(name: $name) {
      success
      message
      project {
        id
        title
        name
        description
        balance
        fundingGoal
        createdAt
        updatedAt
        expiresAt
        active
        ownerConfirmed
        fundsClaimed
        creationConfirmed
        owners {
          user {
            id
            username
          }
        }
        ambassadors {
          user {
            id
            username 
          }
        }
        funders {
          user {
            id
            username
          }
          confirmed
        }
        fundingTxs {
          funder {
            user {
              username
              imageUrl
              twitterHandle
              connectedTwitter
            }
          }
          amount
          paidAt
          comment
        }
      }
    }
  }
`;
