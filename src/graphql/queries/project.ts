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
        type
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
            twitterHandle
            imageUrl
          }
        }
        rewards {
          id
          cost
          description
          currency
          name
          backers
        }
        ambassadors {
          user {
            id
            username 
            twitterHandle
            imageUrl
          }
        }
        sponsors {
          user {
            id
            username 
            twitterHandle
            imageUrl
          }
        }
        funders {
          user {
            id
            username
            twitterHandle
            imageUrl
          }
          confirmed
        }
        grantees {
          id
          url
          name
        }
        fundingTxs {
          id
          funder {
            user {
              username
              imageUrl
              twitterHandle
              connectedTwitter
            }
            badges {
              badge
              description
          }
          }
          amount
          paidAt
          comment
          onChain
        }
      }
    }
  }
`;
