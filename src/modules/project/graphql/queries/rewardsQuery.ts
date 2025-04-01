import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REWARD } from '../fragments/rewardsFragment'

export const QUERY_PROJECT_REWARDS = gql`
  ${FRAGMENT_PROJECT_REWARD}
  query ProjectRewards($input: GetProjectRewardsInput!) {
    projectRewardsGet(input: $input) {
      ...ProjectReward
    }
  }
`

export const QUERY_PROJECT_REWARD = gql`
  ${FRAGMENT_PROJECT_REWARD}
  query ProjectRewardGet($input: GetProjectRewardInput!) {
    projectRewardGet(input: $input) {
      ...ProjectReward
    }
  }
`

export const QUERY_REWARD_CATEGORIES = gql`
  query RewardCategories {
    projectRewardCategoriesGet
  }
`
