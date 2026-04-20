import { gql } from '@apollo/client'

export const QUERY_PROJECT_STRIPE_CONNECT_STATUS = gql`
  query ProjectStripeConnectStatus($projectId: BigInt!) {
    projectStripeConnectStatus(projectId: $projectId) {
      accountId
      chargesEnabled
      payoutsEnabled
      detailsSubmitted
      disabledReason
      isReady
    }
  }
`
