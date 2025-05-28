import { gql } from '@apollo/client'

import { FRAGMENT_SHIPPING_ADDRESS, FRAGMENT_SHIPPING_CONFIG } from './shippingFragment.ts'

export const FRAGMENT_ORDER_ITEM = gql`
  ${FRAGMENT_SHIPPING_CONFIG}
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
  ${FRAGMENT_SHIPPING_ADDRESS}
  fragment Order on Order {
    confirmedAt
    createdAt
    deliveredAt
    id
    shippedAt
    status
    totalInSats
    shippingFeeTotalInSats
    itemsTotalInSats
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
    shippingAddress {
      ...ShippingAddress
    }
  }
`
