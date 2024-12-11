import { gql } from '@apollo/client'

import { FRAGMENT_USER_SUBSCRIPTION } from '../fragments/userSubscriptionFragment'

export const QUERY_USER_SUBSCRIPTIONS = gql`
  ${FRAGMENT_USER_SUBSCRIPTION}
  query UserSubscriptions($input: UserSubscriptionsInput!) {
    userSubscriptions(input: $input) {
      ...UserSubscription
    }
  }
`
