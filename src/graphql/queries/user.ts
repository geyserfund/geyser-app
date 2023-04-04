import { gql } from '@apollo/client'

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
          status
        }
      }
    }
  }
`

export const ME_PROJECT_FOLLOWS = gql`
  query Me {
    me {
      projectFollows {
        id
        title
        name
      }
    }
  }
`

export const USER_PROFILE_QUERY = gql`
  query User($where: UserGetInput!) {
    user(where: $where) {
      __typename
      id
      username
      bio
      imageUrl
      wallet {
        id
        connectionDetails {
          ... on LightningAddressConnectionDetails {
            lightningAddress
          }
        }
      }
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
          status
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
          status
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
`
