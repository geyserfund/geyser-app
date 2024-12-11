import { gql } from '@apollo/client'

import { FRAGMENT_USER_SUBSCRIPTION } from '../fragments/userSubscriptionFragment'

export const MUTATION_CANCEL_USER_SUBSCRIPTION = gql`
  ${FRAGMENT_USER_SUBSCRIPTION}
  mutation CancelUserSubscription($id: BigInt!) {
    userSubscriptionCancel(id: $id) {
      ...UserSubscription
    }
  }
`
