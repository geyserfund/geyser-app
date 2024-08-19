import { gql } from '@apollo/client'

import { ORDERS_STATS_FRAGMENT } from '../fragments/ordersStatsFragment'

export const ORDERS_STATS_QUERY = gql`
  query OrdersStatsGet($input: GetProjectOrdersStatsInput!) {
    ordersStatsGet(input: $input) {
      ...OrdersStatsFragment
    }
  }
  ${ORDERS_STATS_FRAGMENT}
`
