import { gql } from '@apollo/client'

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
