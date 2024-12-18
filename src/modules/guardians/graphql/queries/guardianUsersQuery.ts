import { gql } from '@apollo/client'

import { FRAGMENT_GUARDIAN_RESULT } from '../fragments/guardianUserFragment'

export const QUERY_GUARDIAN_USERS = gql`
  ${FRAGMENT_GUARDIAN_RESULT}
  query GuardianUsersGet($input: GuardianUsersGetInput!) {
    guardianUsersGet(input: $input) {
      guardianUsers {
        ...GuardianResult
      }
    }
  }
`
