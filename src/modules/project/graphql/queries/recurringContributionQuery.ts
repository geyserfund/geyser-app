import { gql } from '@apollo/client'

export const QUERY_RECURRING_CONTRIBUTIONS = gql`
  query RecurringContributions {
    me {
      recurringContributions {
        id
        uuid
        managementNonce
        kind
        status
        paymentMethod
        amount
        currency
        interval
        nextBillingAt
        currentPeriodEndAt
        pausedAt
        canceledAt
        lastChargeFailureMessage
        project {
          id
          name
          title
          thumbnailImage
        }
        projectSubscriptionPlan {
          id
          projectId
          name
          description
          image
          interval
          amountUsdCent
          amountBtcSat
          isHidden
        }
      }
    }
  }
`
