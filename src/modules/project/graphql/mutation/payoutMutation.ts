import { gql } from '@apollo/client'

import { FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND } from '../fragments/paymentFragment.ts'
import { FRAGMENT_PAYOUT, FRAGMENT_PAYOUT_METADATA, FRAGMENT_PAYOUT_WITH_PAYMENT } from '../fragments/payoutFragment.ts'

export const MUTATION_PAYOUT_PREPARE = gql`
  ${FRAGMENT_PAYOUT_WITH_PAYMENT}
  ${FRAGMENT_PAYOUT_METADATA}
  mutation PayoutPrepare($input: PayoutRequestInput!) {
    payoutPrepare(input: $input) {
      payout {
        ...PayoutWithPayment
      }
      payoutMetadata {
        ...PayoutMetadata
      }
    }
  }
`

export const MUTATION_PAYOUT_PAYMENT_PREPARE = gql`
  ${FRAGMENT_PAYOUT}
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  mutation PayoutPaymentPrepare($input: PayoutPaymentCreateInput!) {
    payoutPaymentPrepare(input: $input) {
      payout {
        ...Payout
      }
      swap
      payment {
        ...PaymentForPayoutRefund
      }
    }
  }
`

export const MUTATION_PAYOUT_PAYMENT_INITIATE = gql`
  ${FRAGMENT_PAYOUT}
  mutation PayoutPaymentInitiate($input: PayoutInitiateInput!) {
    payoutPaymentInitiate(input: $input) {
      payout {
        ...Payout
      }
      txHash
    }
  }
`
