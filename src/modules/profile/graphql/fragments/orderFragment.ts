import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_AVATAR } from '@/modules/project/graphql/fragments/projectFragment.ts'

export const FRAGMENT_PROFILE_ORDER_ITEM = gql`
  fragment ProfileOrderItem on OrderItem {
    item {
      id
      name
      cost
      rewardCurrency
      description
      images
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
    contribution {
      id
      bitcoinQuote {
        quote
        quoteCurrency
      }
      amount
      status
      sourceResource {
        ... on Project {
          ...ProjectAvatar
        }
      }
    }
  }
`
