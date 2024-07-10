import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_AVATAR } from './project'

export const FRAGMENT_ORDER_ITEM = gql`
  fragment OrderItem on OrderItem {
    item {
      id
      name
      cost
      rewardCurrency
      category
    }
    quantity
    unitPriceInSats
  }
`

export const FRAGMENT_ORDER = gql`
  ${FRAGMENT_ORDER_ITEM}
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
      ...OrderItem
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
  ${FRAGMENT_ORDER_ITEM}
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
    affiliateFeeInSats
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
      totalInSats
      items {
        ...OrderItem
      }
    }
  }
`

export const FRAGMENT_PROFILE_ORDER_ITEM = gql`
  fragment ProfileOrderItem on OrderItem {
    item {
      id
      name
      cost
      rewardCurrency
      description
      image
      category
    }
    quantity
    unitPriceInSats
  }
`

export const FRAGMENT_PROFILE_ORDER = gql`
  ${FRAGMENT_PROFILE_ORDER_ITEM}
  ${FRAGMENT_PROJECT_AVATAR}
  fragment ProfileOrder on Order {
    id
    referenceCode
    totalInSats
    status
    confirmedAt
    updatedAt
    items {
      ...ProfileOrderItem
    }
    fundingTx {
      id
      bitcoinQuote {
        quote
        quoteCurrency
      }
      amountPaid
      amount
      status
      onChain
      sourceResource {
        ... on Project {
          ...ProjectAvatar
        }
      }
    }
  }
`
