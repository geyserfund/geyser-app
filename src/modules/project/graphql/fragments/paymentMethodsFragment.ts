import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_PAYMENT_METHODS = gql`
  fragment ProjectPaymentMethods on PaymentMethods {
    fiat {
      stripe
    }
  }
`

export const FRAGMENT_PROJECT_SUBSCRIPTION_PLANS = gql`
  fragment ProjectSubscriptionPlans on ProjectSubscriptionPlan {
    cost
    currency
    description
    id
    name
    intervalType
    projectId
  }
`
