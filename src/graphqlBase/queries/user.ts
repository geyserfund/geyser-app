import { gql } from '@apollo/client'

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
      id
      projectFollows {
        id
        title
        name
      }
    }
  }
`
