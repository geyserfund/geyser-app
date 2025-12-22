import { gql } from '@apollo/client'

import { FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND } from '../fragments/paymentFragment.ts'
import { FRAGMENT_PAYOUT, FRAGMENT_PAYOUT_METADATA, FRAGMENT_PAYOUT_WITH_PAYMENT } from '../fragments/payoutFragment.ts'

export const MUTATION_PAYOUT_REQUEST = gql`
  ${FRAGMENT_PAYOUT_WITH_PAYMENT}
  ${FRAGMENT_PAYOUT_METADATA}
  mutation PayoutRequest($input: PayoutRequestInput!) {
    payoutRequest(input: $input) {
      payout {
        ...PayoutWithPayment
      }
      payoutMetadata {
        ...PayoutMetadata
      }
    }
  }
`

export const MUTATION_PAYOUT_PAYMENT_CREATE = gql`
  ${FRAGMENT_PAYOUT}
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  mutation PayoutPaymentCreate($input: PayoutPaymentCreateInput!) {
    payoutPaymentCreate(input: $input) {
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

export const MUTATION_PAYOUT_INITIATE = gql`
  ${FRAGMENT_PAYOUT}
  ${FRAGMENT_PAYOUT_WITH_PAYMENT}
  mutation PayoutInitiate($input: PayoutInitiateInput!) {
    payoutInitiate(input: $input) {
      payout {
        ...Payout
      }
      txHash
    }
  }
`
