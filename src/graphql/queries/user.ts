
import { gql } from '@apollo/client';

export const ME = gql`
query Me {
  me {
    id
    username
    imageUrl
    externalAccounts {
      type
      id
      username
    }
  }
}
`;

export const USER_PROFILE_QUERY = gql`
query User($where: UserQueryInput) {
  user(where: $where) {
    id
    username
    imageUrl
    externalAccounts {
      type
      id
      username
    }
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
