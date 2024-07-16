import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REWARD } from '../fragments/rewardsFragment'

export const MUTATION_UPDATE_PROJECT_CURRENCY = gql`
  ${FRAGMENT_PROJECT_REWARD}
  mutation ProjectRewardCurrencyUpdate($input: ProjectRewardCurrencyUpdate!) {
    projectRewardCurrencyUpdate(input: $input) {
      ...ProjectReward
    }
  }
`
