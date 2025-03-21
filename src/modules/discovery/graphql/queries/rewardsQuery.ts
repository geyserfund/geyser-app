import { gql } from '@apollo/client'

import { FRAGMENT_REWARD_FOR_LANDING_PAGE } from '../fragments/rewardFragment'

export const QUERY_TRENDING_REWARDS_FOR_LANDING_PAGE = gql`
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

export const QUERY_TRENDING_REWARDS_FOR_PRODUCTS_PAGE = gql`
  ${FRAGMENT_REWARD_FOR_LANDING_PAGE}
  query ProjectRewardsTrendingMonthlyGet {
    projectRewardsTrendingMonthlyGet {
      count
      projectReward {
        ...RewardForLandingPage
      }
    }
  }
`
