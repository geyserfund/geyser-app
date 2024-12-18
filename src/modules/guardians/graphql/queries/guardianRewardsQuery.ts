import { gql } from '@apollo/client'

import { FRAGMENT_GUARDIAN_PROJECT_REWARD } from '../fragments/guardianRewardsFragment'

export const QUERY_GUARDIAN_PROJECT_REWARDS = gql`
  ${FRAGMENT_GUARDIAN_PROJECT_REWARD}
  query GuardianProjectRewardsGet($input: GetProjectRewardInput!) {
    projectRewardsGet(input: $input) {
      ...GuardianProjectReward
    }
  }
`
