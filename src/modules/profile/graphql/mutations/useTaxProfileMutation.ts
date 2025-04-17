import { gql } from '@apollo/client'

import { FRAGMENT_USER_TAX_PROFILE } from '../fragments/userFragment.ts'

export const USER_TAX_PROFILE_UPDATE_MUTATION = gql`
  ${FRAGMENT_USER_TAX_PROFILE}
  mutation UserTaxProfileUpdate($input: UserTaxProfileUpdateInput!) {
    userTaxProfileUpdate(input: $input) {
      ...UserTaxProfile
    }
  }
`
