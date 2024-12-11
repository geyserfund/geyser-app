import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_SUBSCRIPTION_PLANS } from '../fragments/paymentMethodsFragment'

export const QUERY_PROJECT_STATS_INSIGHT = gql`
  ${FRAGMENT_PROJECT_SUBSCRIPTION_PLANS}
  query ProjectSubscriptionPlans($input: ProjectSubscriptionPlansInput!) {
    projectSubscriptionPlans(input: $input) {
      ...ProjectSubscriptionPlans
    }
  }
`
