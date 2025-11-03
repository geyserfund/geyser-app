import { gql } from '@apollo/client'

export const FRAGMENT_PAYMENT_PAYOUT = gql`
  fragment PaymentPayout on Payment {
    id
    payoutAmount
    status
  }
`

export const FRAGMENT_PAYOUT = gql`
  fragment Payout on Payout {
    amount
    expiresAt
    id
    status
  }
`

export const FRAGMENT_PAYOUT_METADATA = gql`
  fragment PayoutMetadata on PayoutMetadata {
    nonce
    swapContractAddress
    aonContractAddress
  }
`
