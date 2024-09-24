import { gql } from '@apollo/client'

import {
  FRAGMENT_PROJECT_CONTRIBUTOR_CONTRIBUTION_SUMMARY,
  FRAGMENT_PROJECT_FUNDER,
  FRAGMENT_PROJECT_LEADERBOARD_CONTRIBUTORS,
  FRAGMENT_PROJECT_USER_CONTRIBUTOR,
} from '../fragments/funderFragment'

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

export const QUERY_PROJECT_USER_CONTRIBUTOR = gql`
  ${FRAGMENT_PROJECT_USER_CONTRIBUTOR}
  ${FRAGMENT_PROJECT_CONTRIBUTOR_CONTRIBUTION_SUMMARY}
  query ProjectUserContributor($input: GetContributorInput!, $period: ContributionsSummaryPeriod) {
    contributor(input: $input) {
      ...UserContributor
      contributionsSummary(period: $period) {
        ...ContributorContributionsSummary
      }
    }
  }
`
