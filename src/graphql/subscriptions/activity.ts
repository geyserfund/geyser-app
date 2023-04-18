import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_LANDING_PAGE } from '../queries'
import {
  FRAGMENT_ENTRY_FOR_LANDING_PAGE,
  FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE,
  FRAGMENT_REWARD_FOR_LANDING_PAGE,
} from '../queries/activities'

export const ACTIVITY_CREATION_SUBSCRIPTION = gql`
  ${FRAGMENT_ENTRY_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  ${FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE}
  ${FRAGMENT_REWARD_FOR_LANDING_PAGE}
  subscription ActivityCreated($input: ActivityCreatedSubscriptionInput) {
    activityCreated(input: $input) {
      ... on Entry {
        ...EntryForLandingPage
      }
      ... on Project {
        ...ProjectForLandingPage
      }
      ... on FundingTx {
        ...FundingTxForLandingPage
      }
      ... on ProjectReward {
        ...RewardForLandingPage
      }
    }
  }
`
