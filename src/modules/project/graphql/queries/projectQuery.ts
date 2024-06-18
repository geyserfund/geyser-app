import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_HEADER_SUMMARY, FRAGMENT_PROJECT_PAGE_BODY } from '../fragments/projectFragment'
import { FRAGMENT_PROJECT_PAGE_WALLET } from '../fragments/walletFragment'

export const QUERY_PROJECT_PAGE_BODY = gql`
  ${FRAGMENT_PROJECT_PAGE_BODY}
  query ProjectPageBody($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectPageBody
    }
  }
`

export const QUERY_PROJECT_HEADER_SUMMARY = gql`
  ${FRAGMENT_PROJECT_HEADER_SUMMARY}
  query ProjectPageHeaderSummary($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectHeaderSummary
    }
  }
`

export const QUERY_PROJECT_PAGE_WALLETS = gql`
  ${FRAGMENT_PROJECT_PAGE_WALLET}
  query ProjectPageWallets($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      wallets {
        ...ProjectPageWallet
      }
    }
  }
`
