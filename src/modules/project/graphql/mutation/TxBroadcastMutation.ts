import { gql } from '@apollo/client'

export const MUTATION_PAYMENT_SWAP_CLAIM_TX_BROADCAST = gql`
  mutation PaymentSwapClaimTxBroadcast($input: PaymentSwapClaimTxBroadcastInput!) {
    paymentSwapClaimTxBroadcast(input: $input) {
      id
      success
      txHash
    }
  }
`
