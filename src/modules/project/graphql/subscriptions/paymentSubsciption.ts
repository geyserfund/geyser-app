import { gql } from '@apollo/client'

import { FRAGMENT_PAYMENT_SUBSCRIPTION } from '../fragments/paymentFragment.ts'

export const PROJECT_PAYMENT_SUBSCRIPTION = gql`
  ${FRAGMENT_PAYMENT_SUBSCRIPTION}
  subscription PaymentStatusUpdated($input: PaymentStatusUpdatedInput!) {
    paymentStatusUpdated(input: $input) {
      ...PaymentSubscription
    }
  }
`
