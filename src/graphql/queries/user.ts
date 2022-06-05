
import { gql } from '@apollo/client';

export const ME = gql`
query Me {
  me {
    id
    username
    imageUrl
    twitterHandle
    connectedTwitter
  }
}
`;

export const USER_PROFILE_QUERY = gql`
query User {
  user {
    id
    username
    imageUrl
    externalAccounts {
      type
      id
      username
    }
    twitterHandle
    connectedTwitter
    contributions {
      isAmbassador
      isFunder
      isSponsor
      funder {
        id
        amountFunded
        timesFunded
        confirmedAt
      }
      project {
        id
        title
        name
        description
        media
        createdAt
      }
    }
    ownerOf {
      project {
        id
        title
        name
        description
        balance
        fundingGoal
        createdAt
        updatedAt
        active
        media
        expiresAt
        creationConfirmed
        funders {
          id
        }
        owners {
          id
          user {
            imageUrl
          }
        }
      }
    }
  }
}`;
