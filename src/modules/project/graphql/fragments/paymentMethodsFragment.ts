import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_PAYMENT_METHODS = gql`
  fragment ProjectPaymentMethods on PaymentMethods {
    fiat {
      enabled
      stripe
    }
  }
`
