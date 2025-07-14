import { gql } from '@apollo/client'

import { FRAGMENT_USER_ACCOUNT_KEYS } from '../fragments/userAccountKeysFragment'
import { FRAGMENT_PROJECT_OWNER_USER_FOR_INVOICE } from '../fragments/userFragment.ts'

export const QUERY_PROJECT_REWARDS = gql`
  query GetUserIpCountry {
    userIpCountry
  }
`

export const QUERY_PROJECT_OWNER_USER_FOR_INVOICE = gql`
  ${FRAGMENT_PROJECT_OWNER_USER_FOR_INVOICE}
  query GetProjectOwnerUserForInvoice($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      owners {
        id
        user {
          ...ProjectOwnerUserForInvoice
        }
      }
    }
  }
`

export const QUERY_USER_ACCOUNT_KEYS_UPDATE = gql`
  ${FRAGMENT_USER_ACCOUNT_KEYS}
  query AccountKeys($where: UserGetInput!) {
    user(where: $where) {
      accountKeys {
        ...UserAccountKeys
      }
    }
  }
`
