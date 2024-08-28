import { gql } from '@apollo/client'

import { FRAGMENT_REWARD_FOR_LANDING_PAGE } from '../fragments/rewardFragment'

export const QUERY_PROJECTS_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_REWARD_FOR_LANDING_PAGE}
  query ProjectRewardsTrendingWeeklyGet {
    projectRewardsTrendingWeeklyGet {
      count
      projectReward {
        ...RewardForLandingPage
      }
    }
  }
`
