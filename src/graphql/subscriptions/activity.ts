import { gql } from '@apollo/client'

import { FRAGMENT_ENTRY_FOR_LANDING_PAGE } from '../fragments/entries'
import { FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE } from '../fragments/funding'
import {
  FRAGMENT_PROJECT_FOR_LANDING_PAGE,
  FRAGMENT_PROJECT_REWARD_FOR_LANDING_PAGE,
} from '../fragments/project'

export const ACTIVITY_CREATION_SUBSCRIPTION = gql`
  ${FRAGMENT_ENTRY_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  ${FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_REWARD_FOR_LANDING_PAGE}
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
        ...ProjectRewardForLandingPage
      }
    }
  }
`
