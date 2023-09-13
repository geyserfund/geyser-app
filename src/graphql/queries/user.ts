import { gql } from '@apollo/client'

import {
  FRAGMENT_PROJECT_FOR_LANDING_PAGE,
  FRAGMENT_PROJECT_FOR_PROFILE_PAGE,
} from '../fragments/project'
import { FRAGMENT_USER_ME } from '../fragments/user'

export const QUERY_ME = gql`
  ${FRAGMENT_USER_ME}
  query Me {
    me {
      ...UserMe
    }
  }
`

export const QUERY_ME_PROJECT_FOLLOWS = gql`
  query MeProjectFollows {
    me {
      projectFollows {
        id
        title
        name
      }
    }
  }
`

export const QUERY_USER_PROFILE = gql`
  query UserProfile($where: UserGetInput!) {
    user(where: $where) {
      __typename
      id
      username
      bio
      imageUrl
      ranking
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
          createdAt
          status
          thumbnailImage
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

export const QUERY_USER_PROFILE_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_PROFILE_PAGE}
  query UserProfileProjects($where: UserGetInput!) {
    user(where: $where) {
      ownerOf {
        project {
          ...ProjectForProfilePage
        }
      }
    }
  }
`

export const QUERY_USER_FOLLOWED_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query UserFollowedProjects($where: UserGetInput!) {
    user(where: $where) {
      projectFollows {
        ...ProjectForLandingPage
      }
    }
  }
`
