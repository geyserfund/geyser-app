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
