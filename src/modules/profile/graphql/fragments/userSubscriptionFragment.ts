import { gql } from '@apollo/client'

export const FRAGMENT_USER_SUBSCRIPTION = gql`
  fragment UserSubscription on UserSubscription {
    canceledAt
    createdAt
    id
    nextBillingDate
    startDate
    status
    updatedAt
    projectSubscriptionPlan {
      id
      projectId
      name
      cost
      interval
      currency
    }
  }
`
