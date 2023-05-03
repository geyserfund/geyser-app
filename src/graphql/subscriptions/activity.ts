import { gql } from '@apollo/client'

import {
  EntryQueryParametersForLandingPage,
  FundingTxQueryParameterForLandingPage,
  RewardQueryParametersForLandingPage,
} from '../../pages/landing/feed/activity.graphql'
import { ProjectParametersForLandingPage } from '../../pages/landing/projects/projects.graphql'

export const ACTIVITY_CREATION_SUBSCRIPTION = gql`
subscription ActivityCreated($input: ActivityCreatedSubscriptionInput) {
  activityCreated(input: $input) {
        ... on Entry ${EntryQueryParametersForLandingPage}
        ... on Project ${ProjectParametersForLandingPage}
        ... on FundingTx ${FundingTxQueryParameterForLandingPage}
        ... on ProjectReward ${RewardQueryParametersForLandingPage}
    }
  }
`
