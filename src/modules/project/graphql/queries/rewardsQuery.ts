import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REWARD } from '../fragments/rewardsFragment'

export const QUERY_PROJECT_REWARDS = gql`
  ${FRAGMENT_PROJECT_REWARD}
  query ProjectRewards($input: GetProjectRewardInput!) {
    projectRewardsGet(input: $input) {
      ...ProjectReward
    }
  }
`

export const QUERY_PROJECT_REWARD = gql`
  ${FRAGMENT_PROJECT_REWARD}
  query ProjectReward($getProjectRewardId: BigInt!) {
    getProjectReward(id: $getProjectRewardId) {
      ...ProjectReward
    }
  }
`

export const QUERY_REWARD_CATEGORIES = gql`
  query RewardCategories {
    projectRewardCategoriesGet
  }
`
