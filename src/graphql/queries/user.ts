import { gql } from '@apollo/client'

import { ProjectParametersForLandingPage } from '../../pages/landing/projects/projects.graphql'

export const ME = gql`
  query Me {
    me {
      id
      username
      imageUrl
      email
      externalAccounts {
        id
        accountType
        externalUsername
        externalId
        public
      }
      ownerOf {
        project {
          id
          name
          image
          thumbnailImage
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
        accountType
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
        }
      }
      projectFollows {
        id
      }
    }
  }
`

export const USER_PROFILE_PROJECTS = gql`
  query User($where: UserGetInput!) {
    user(where: $where) {
      ownerOf {
        project ${ProjectParametersForLandingPage}
      }
    }
  }
`

export const USER_FOLLOWED_PROJECTS = gql`
  query User($where: UserGetInput!) {
    user(where: $where) {
      projectFollows ${ProjectParametersForLandingPage}
    }
  }
`
