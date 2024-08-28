import { gql } from '@apollo/client'

import { TOP_CONTRIBUTORS_FRAGMENT } from '../fragments/topContributorsFragment'

export const QUERY_LEADERBOARD_GLOBAL_CONTRIBUTORS = gql`
  ${TOP_CONTRIBUTORS_FRAGMENT}
  query LeaderboardGlobalContributors($input: LeaderboardGlobalContributorsGetInput!) {
    leaderboardGlobalContributorsGet(input: $input) {
      ...TopContributorsFragment
    }
  }
`
