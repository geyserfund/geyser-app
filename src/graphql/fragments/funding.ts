import { gql } from '@apollo/client'

export const FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE = gql`
  fragment FundingTxForLandingPage on FundingTx {
    id
    comment
    amount
    funder {
      id
      amountFunded
      timesFunded
      confirmedAt
      user {
        id
        username
        imageUrl
        externalAccounts {
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
        name
        title
        image
        createdAt
        thumbnailImage
      }
      ... on Entry {
        createdAt
        id
        image
        title
        project {
          id
          name
        }
      }
    }
  }
`

export const FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS = gql`
  fragment FundingTxWithInvoiceStatus on FundingTx {
    id
    uuid
    invoiceId
    status
    onChain
    invoiceStatus
    invoiceStatus
    paymentRequest
    creatorEmail
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
    creatorEmail
    funder {
      id
      amountFunded
      timesFunded
      confirmedAt
      user {
        id
        username
        imageUrl
      }
    }
  }
`

export const FRAGMENT_FUNDING_TX_DOWNLOAD_INVOICE = gql`
  fragment FundingTxForDownloadInvoice on FundingTx {
    id
    donationAmount
    amountPaid
    uuid
    funder {
      user {
        username
      }
    }
    projectId
    paidAt
    order {
      items {
        item {
          name
        }
        quantity
        unitPriceInSats
      }
      totalInSats
    }
    status
    bitcoinQuote {
      quote
      quoteCurrency
    }
  }
`
