import { gql } from '@apollo/client'

import { TOP_PROJECTS_FRAGMENT } from '../fragments/topProjectsFragment'

export const QUERY_LEADERBOARD_GLOBAL_PROJECTS = gql`
  ${TOP_PROJECTS_FRAGMENT}

  query LeaderboardGlobalProjects($input: LeaderboardGlobalProjectsGetInput!) {
    leaderboardGlobalProjectsGet(input: $input) {
      ...TopProjectsFragment
    }
  }
`
