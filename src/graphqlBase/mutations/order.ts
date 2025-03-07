import { gql } from '@apollo/client'

export const MUTATION_ORDER_STATUS_UPDATE = gql`
  mutation OrderStatusUpdate($input: OrderStatusUpdateInput!) {
    orderStatusUpdate(input: $input) {
      status
      id
      shippedAt
      deliveredAt
    }
  }
`
