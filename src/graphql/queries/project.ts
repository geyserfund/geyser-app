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
        originUrl
        balance
        fundingGoal
        createdAt
        updatedAt
        expiresAt
        active
        ownerConfirmed
        fundsClaimed
        creationConfirmed
        creator {
          user {
            id
            username
          }
          confirmed
        }
        owner {
          user {
            id
            username
          }
          confirmed
        }
        ambassadors {
          confirmed
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
          user {
            username
            imageUrl
            twitterHandle
            connectedTwitter
          }
          amount
          paidAt
          comment
        }
      }
    }
  }
`;
