import { gql } from '@apollo/client'

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
    contribution {
      id
      bitcoinQuote {
        quoteCurrency
        quote
      }
      amount
      donationAmount
      email
      isAnonymous
      status
      uuid
      privateComment
    }
  }
`
