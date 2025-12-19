import { gql } from '@apollo/client'

import { FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND } from './paymentFragment.ts'

export const FRAGMENT_PAYMENT_PAYOUT = gql`
  fragment PaymentPayout on Payment {
    id
    payoutAmount
    status
  }
`

export const FRAGMENT_PAYOUT = gql`
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  fragment Payout on Payout {
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
