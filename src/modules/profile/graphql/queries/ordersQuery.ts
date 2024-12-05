import { gql } from '@apollo/client'

import { FRAGMENT_PROFILE_ORDER } from '../fragments/orderFragment'

export const QUERY_USER_ORDERS = gql`
  ${FRAGMENT_PROFILE_ORDER}
  query UserOrdersGet($input: OrdersGetInput!) {
    ordersGet(input: $input) {
      orders {
        ...ProfileOrder
      }
      pagination {
        count
        take
        cursor {
          id
        }
      }
    }
  }
`
