import { gql } from '@apollo/client'

import { FRAGMENT_PROFILE_ORDER, FRAGMENT_USER_PROJECT_CONTRIBUTIONS } from '../fragments'
import { FRAGMENT_PROJECT_FOR_PROFILE_PAGE } from '../fragments/project'
import { FRAGMENT_USER_FOR_PROFILE_PAGE, FRAGMENT_USER_ME } from '../fragments/user'

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
      id
      projectFollows {
        id
        title
        name
      }
    }
  }
`

export const QUERY_USER_FOR_PROFILE_PAGE = gql`
  ${FRAGMENT_USER_FOR_PROFILE_PAGE}
  query UserForProfilePage($where: UserGetInput!) {
    user(where: $where) {
      ...UserForProfilePage
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
  ${FRAGMENT_PROJECT_FOR_PROFILE_PAGE}
  query UserFollowedProjects($where: UserGetInput!) {
    user(where: $where) {
      projectFollows {
        ...ProjectForProfilePage
      }
    }
  }
`
export const QUERY_USER_CONTRIBUTIONS = gql`
  ${FRAGMENT_USER_PROJECT_CONTRIBUTIONS}
  query UserProfileContributions($where: UserGetInput!) {
    user(where: $where) {
      contributions {
        ...UserProjectContributions
      }
    }
  }
`

export const QUERY_USER_PROFILE_ORDERS = gql`
  ${FRAGMENT_PROFILE_ORDER}
  query UserProfileOrders($where: UserGetInput!) {
    user(where: $where) {
      orders {
        ...ProfileOrder
      }
    }
  }
`
