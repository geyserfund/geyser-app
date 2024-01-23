import { gql } from '@apollo/client'

export const FRAGMENT_ORDER = gql`
  fragment Order on Order {
    confirmedAt
    createdAt
    deliveredAt
    id
    shippedAt
    status
    totalInSats
    updatedAt
    user {
      id
      imageUrl
      username
      email
    }
    items {
      item {
        id
        name
        cost
        rewardCurrency
        rewardType
      }
      quantity
      unitPriceInSats
    }
    fundingTx {
      id
      bitcoinQuote {
        quoteCurrency
        quote
      }
      amount
      amountPaid
      donationAmount
      address
      email
      fundingType
      invoiceStatus
      isAnonymous
      status
      uuid
    }
  }
`

export const FRAGMENT_TRANSACTION_ORDER = gql`
  fragment FundingTxOrder on FundingTx {
    id
    invoiceStatus
    donationAmount
    amountPaid
    amount
    email
    paidAt
    status
    invoiceId
    uuid
    bitcoinQuote {
      quoteCurrency
      quote
    }
    funder {
      user {
        id
        imageUrl
        username
        externalAccounts {
          id
          externalUsername
          externalId
          accountType
          public
        }
      }
    }
    order {
      id
      referenceCode
      items {
        item {
          id
          name
        }
        quantity
        unitPriceInSats
      }
      totalInSats
    }
  }
`
