import { gql } from '@apollo/client';

export const QUERY_PROJECT_BY_NAME = gql`
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
        media
        ownerConfirmed
        fundsClaimed
        creationConfirmed
        owners {
          id
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
          id
          user {
            id
            username
            twitterHandle
            imageUrl
          }
        }
        sponsors {
          id
          image
          url
          user {
            id
            username
            twitterHandle
            imageUrl
          }
        }
        funders {
          id
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
          gif
          onChain
        }
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
query projects {
    projects {
      success
      message
      projects {
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
        media
        owners {
          id
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
          id
          user {
            id
            username
            twitterHandle
            imageUrl
          }
        }
        sponsors {
          id
          image
          url
          user {
            id
            username
            twitterHandle
            imageUrl
          }
        }
        funders {
          id
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
          gif
          onChain
        }
      }
    }
  }
`;
