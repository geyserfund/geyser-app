import { gql } from '@apollo/client'

import {
  FRAGMENT_ORDER,
  FRAGMENT_PAGINATION,
  FRAGMENT_TRANSACTION_ORDER,
} from '../fragments'

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

export const QUERY_FUNDINGTXS_ORDER = gql`
  ${FRAGMENT_TRANSACTION_ORDER}
  ${FRAGMENT_PAGINATION}
  query FundingTxsOrderGet($input: GetFundingTxsInput) {
    fundingTxsGet(input: $input) {
      pagination {
        ...Pagination
      }
      fundingTxs {
        ...FundingTxOrder
      }
    }
  }
`
