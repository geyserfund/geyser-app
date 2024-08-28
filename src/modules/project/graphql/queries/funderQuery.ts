import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FUNDER, FRAGMENT_PROJECT_LEADERBOARD_CONTRIBUTORS } from '../fragments/funderFragment'

export const QUERY_PROJECT_PAGE_FUNDERS = gql`
  ${FRAGMENT_PROJECT_FUNDER}
  query ProjectPageFunders($input: GetFundersInput!) {
    fundersGet(input: $input) {
      ...ProjectFunder
    }
  }
`

export const QUERY_PROJECT_PAGE_LEADERBOARD = gql`
  ${FRAGMENT_PROJECT_LEADERBOARD_CONTRIBUTORS}
  query ProjectLeaderboardContributorsGet($input: ProjectLeaderboardContributorsGetInput!) {
    projectLeaderboardContributorsGet(input: $input) {
      ...ProjectLeaderboardContributors
    }
  }
`
