import { gql } from '@apollo/client'

import { FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND } from './paymentFragment.ts'

export const FRAGMENT_PAYOUT = gql`
  fragment Payout on Payout {
    id
    status
    amount
    expiresAt
  }
`

export const FRAGMENT_PAYOUT_WITH_PAYMENT = gql`
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  fragment PayoutWithPayment on Payout {
    amount
    expiresAt
    id
    status
    payments {
      ...PaymentForPayoutRefund
    }
  }
`

export const FRAGMENT_PAYOUT_METADATA = gql`
  fragment PayoutMetadata on PayoutMetadata {
    nonce
    swapContractAddress
    aonContractAddress
  }
`
