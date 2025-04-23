import { gql } from '@apollo/client'

import { FRAGMENT_USER_AVATAR } from '../fragments/userFragment'

export const QUERY_PROJECT_FOLLOWERS = gql`
  ${FRAGMENT_USER_AVATAR}
  query ProjectFollowers($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      followers {
        ...UserAvatar
      }
    }
  }
`
