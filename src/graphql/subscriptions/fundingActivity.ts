import { gql } from '@apollo/client'

import { FRAGMENT_FUNDING_TX } from '../fragments/funding'

export const PROJECT_FUNDING_SUBSCRIPTION = gql`
  ${FRAGMENT_FUNDING_TX}
  subscription fundingActivityCreated(
    $input: ActivityCreatedSubscriptionInput
  ) {
    activityCreated(input: $input) {
      ... on FundingTx {
        ...FundingTx
      }
    }
  }
`
