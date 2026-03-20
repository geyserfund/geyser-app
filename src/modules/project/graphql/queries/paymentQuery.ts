import { gql } from '@apollo/client'

export const QUERY_PAYMENT_BY_ONCHAIN_SWAP_ID = gql`
  query PaymentByOnChainSwapId($input: PaymentGetInput!) {
    payment(input: $input) {
      id
    }
  }
`
