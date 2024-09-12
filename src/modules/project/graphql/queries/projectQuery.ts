import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_GRANT_APPLICANT } from '../fragments/grantFragment'
import {
  FRAGMENT_PROJECT_HEADER_SUMMARY,
  FRAGMENT_PROJECT_PAGE_BODY,
  FRAGMENT_PROJECT_PAGE_DETAILS,
} from '../fragments/projectFragment'
import { FRAGMENT_PROJECT_PAGE_WALLET, FRAGMENT_PROJECT_WALLET_CONNECTION_DETAILS } from '../fragments/walletFragment'

export const QUERY_PROJECT_PAGE_BODY = gql`
  ${FRAGMENT_PROJECT_PAGE_BODY}
  query ProjectPageBody($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectPageBody
    }
  }
`

export const QUERY_PROJECT_PAGE_DETAILS = gql`
  ${FRAGMENT_PROJECT_PAGE_DETAILS}
  query ProjectPageDetails($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectPageDetails
    }
  }
`

export const QUERY_PROJECT_GRANT_APPLICATION = gql`
  ${FRAGMENT_PROJECT_GRANT_APPLICANT}
  query ProjectGrantApplications($where: UniqueProjectQueryInput!, $input: ProjectGrantApplicationsInput) {
    projectGet(where: $where) {
      grantApplications(input: $input) {
        ...ProjectGrantApplicant
      }
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

export const QUERY_PROJECT_WALLET_CONNECTION_DETAILS = gql`
  ${FRAGMENT_PROJECT_WALLET_CONNECTION_DETAILS}
  query ProjectWalletConnectionDetails($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      wallets {
        ...ProjectWalletConnectionDetails
      }
    }
  }
`
