import { gql } from '@apollo/client'

import { FRAGMENT_PAGINATION } from '@/graphqlBase/fragments/pagination.ts'

import { FRAGMENT_ORDER } from '../fragments/orderFragment.ts'

export const QUERY_ORDERS = gql`
  ${FRAGMENT_ORDER}
  ${FRAGMENT_PAGINATION}
  query OrdersGet($input: OrdersGetInput!) {
    ordersGet(input: $input) {
      pagination {
        ...Pagination
      }
      orders {
        ...Order
      }
    }
  }
`
