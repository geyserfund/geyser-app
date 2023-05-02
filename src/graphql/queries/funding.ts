import { gql } from '@apollo/client'

import { FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE } from './activities'

export const FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS = gql`
  fragment FundingTxWithInvoiceStatus on FundingTx {
    id
    invoiceId
    status
    onChain
    invoiceStatus
    invoiceStatus
    paymentRequest
  }
`

export const FRAGMENT_FUNDING_TX = gql`
  fragment FundingTx on FundingTx {
    id
    uuid
    invoiceId
    paymentRequest
    amount
    status
    invoiceStatus
    comment
    media
    paidAt
    onChain
    address
    source
    method
    projectId
    funder {
      id
      user {
        id
        username
        imageUrl
      }
    }
  }
`

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
