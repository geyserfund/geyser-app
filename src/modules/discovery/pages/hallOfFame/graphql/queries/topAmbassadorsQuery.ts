import { gql } from '@apollo/client'

import { TOP_AMBASSADORS_FRAGMENT } from '../fragments/topAmbassadorsFragment'

export const QUERY_LEADERBOARD_GLOBAL_CONTRIBUTORS = gql`
  ${TOP_AMBASSADORS_FRAGMENT}
  query LeaderboardGlobalAmbassadorsGet($input: LeaderboardGlobalAmbassadorsGetInput!) {
    leaderboardGlobalAmbassadorsGet(input: $input) {
      ...TopAmbassadorsFragment
    }
  }
`
