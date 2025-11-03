import { gql } from '@apollo/client'

import { FRAGMENT_USER_ACCOUNT_KEYS } from '../fragments/userAccountKeysFragment'

export const MUTATION_USER_ACCOUNT_KEYS_CREATE = gql`
  ${FRAGMENT_USER_ACCOUNT_KEYS}
  mutation UserAccountKeysUpdate($input: UserAccountKeysUpdateInput!) {
    userAccountKeysUpdate(input: $input) {
      ...UserAccountKeys
    }
  }
`
