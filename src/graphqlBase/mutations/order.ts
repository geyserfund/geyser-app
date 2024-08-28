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

export const MUTATION_TRANSACTION_ORDER_CONFIRM = gql`
  mutation FundingConfirm($input: FundingConfirmInput!) {
    fundingConfirm(input: $input) {
      id
      success
    }
  }
`
