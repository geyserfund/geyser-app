import { gql } from '@apollo/client';

export const ME = gql`
  query Me {
    me {
      id
      username
      imageUrl
      email
      externalAccounts {
        id
        type
        externalUsername
        externalId
        public
      }
      ownerOf {
        project {
          id
          name
          image
          title
        }
      }
    }
  }
`;

export const USER_PROFILE_QUERY = gql`
  query User($where: UserGetInput!) {
    user(where: $where) {
      id
      username
      imageUrl
      externalAccounts {
        id
        type
        externalUsername
        externalId
        public
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
      entries {
        id
      }
      fundingTxs {
        id
      }
    }
  }
`;
