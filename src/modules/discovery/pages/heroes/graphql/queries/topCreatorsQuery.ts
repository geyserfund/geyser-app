import { gql } from '@apollo/client'

import { TOP_CREATORS_FRAGMENT } from '../fragments/topCreatorsFragment'

export const QUERY_LEADERBOARD_GLOBAL_CREATORS = gql`
  ${TOP_CREATORS_FRAGMENT}
  query LeaderboardGlobalCreatorsGet($input: LeaderboardGlobalCreatorsGetInput!) {
    leaderboardGlobalCreatorsGet(input: $input) {
      ...TopCreatorsFragment
    }
  }
`
