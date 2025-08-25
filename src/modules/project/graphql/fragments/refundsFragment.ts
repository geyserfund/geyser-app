import { gql } from '@apollo/client'

export const FRAGMENT_PAYMENT_REFUND = gql`
  fragment PaymentRefund on PaymentRefund {
    id
    amount
    status
  }
`

export const FRAGMENT_PLEDGE_REFUND = gql`
  fragment PledgeRefund on PledgeRefund {
    id
    status
    expiresAt
    amount
  }
`

export const FRAGMENT_PLEDGE_REFUND_METADATA = gql`
  fragment PledgeRefundMetadata on PledgeRefundMetadata {
    nonce
    swapContractAddress
    aonContractAddress
  }
`
