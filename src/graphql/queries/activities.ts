import { gql } from '@apollo/client'

import { FRAGMENT_ENTRY_FOR_LANDING_PAGE } from '../fragments/entries'
import { FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE } from '../fragments/funding'
import {
  FRAGMENT_PROJECT_FOR_LANDING_PAGE,
  FRAGMENT_PROJECT_REWARD_FOR_LANDING_PAGE,
} from '../fragments/project'

export const FRAGMENT_ACTIVITY_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_ENTRY_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_REWARD_FOR_LANDING_PAGE}
  ${FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  fragment ActivityForLandingPage on Activity {
    id
    createdAt
    resource {
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

export const QUERY_ACTIVITIES_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_ACTIVITY_FOR_LANDING_PAGE}
  query ActivitiesForLandingPage($input: GetActivitiesInput) {
    getActivities(input: $input) {
      ...ActivityForLandingPage
    }
  }
`
