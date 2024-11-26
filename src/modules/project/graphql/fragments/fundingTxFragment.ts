import { gql } from '@apollo/client'

import { FRAGMENT_USER_AVATAR } from './userFragment'

export const FRAGMENT_PROJECT_FUNDING_TX = gql`
  ${FRAGMENT_USER_AVATAR}
  fragment ProjectFundingTx on FundingTx {
    id
    amount
    media
    comment
    paidAt
    bitcoinQuote {
      quote
      quoteCurrency
    }
    funder {
      id
      user {
        ...UserAvatar
      }
    }
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
    createdAt
    bitcoinQuote {
      quote
      quoteCurrency
    }
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

export const FRAGMENT_FUNDING_TX_FOR_SUBSCRIPTION = gql`
  ${FRAGMENT_FUNDING_TX}
  fragment FundingTxForSubscription on FundingTx {
    ...FundingTx
    projectGoalId
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
    createdAt
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
