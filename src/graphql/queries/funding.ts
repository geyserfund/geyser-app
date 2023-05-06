import { gql } from '@apollo/client'

import {
  FRAGMENT_FUNDING_TX,
  FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE,
  FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS,
} from '../fragments/funding'

export const QUERY_GET_FUNDING = gql`
  ${FRAGMENT_FUNDING_TX}
  query GetFundingTx($id: BigInt!) {
    fundingTx(id: $id) {
      ...FundingTx
    }
  }
`

export const FRAGMENT_FUNDING_TX_FOR_USER_CONTRIBUTION = gql`
  fragment FundingTxForUserContribution on FundingTx {
    id
    comment
    amount
    funder {
      id
      user {
        id
        username
        imageUrl
        externalAccounts {
          id
          externalUsername
          public
          accountType
        }
      }
    }
    paidAt
    onChain
    media
    source
    method
    projectId
    sourceResource {
      ... on Project {
        id
        createdAt
        name
        title
        thumbnailImage
        image
      }
      ... on Entry {
        id
        createdAt
        image
      }
    }
  }
`

export const QUERY_FUNDING_TX_STATUS_AND_INVOICE_STATUS = gql`
  ${FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS}
  query FundingTxWithInvoiceStatus($fundingTxID: BigInt!) {
    fundingTx(id: $fundingTxID) {
      ...FundingTxWithInvoiceStatus
    }
  }
`

export const QUERY_GET_FUNDING_TXS_LANDING = gql`
  ${FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE}
  query FundingTxsForLandingPage($input: GetFundingTxsInput) {
    getFundingTxs(input: $input) {
      ...FundingTxForLandingPage
    }
  }
`

export const QUERY_FUNDING_TX_FOR_USER_CONTRIBUTION = gql`
  ${FRAGMENT_FUNDING_TX_FOR_USER_CONTRIBUTION}
  query FundingTxForUserContribution($fundingTxId: BigInt!) {
    fundingTx(id: $fundingTxId) {
      ...FundingTxForUserContribution
    }
  }
`
