import { gql } from '@apollo/client'

import { FRAGMENT_USER_ME } from '@/graphqlBase/fragments'

export const MUTATION_DELETE_ENTRY = gql`
  ${FRAGMENT_USER_ME}
  mutation UserCreate($input: UserCreateInput!) {
    userCreate(input: $input) {
      ...UserMe
    }
  }
`
