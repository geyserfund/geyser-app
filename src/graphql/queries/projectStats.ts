import { gql } from '@apollo/client'

import {
  FRAGMENT_FUNDING_METHOD_STATS,
  FRAGMENT_PROJECT_HISTORY_STATS,
  FRAGMENT_PROJECT_STATS_INSIGHTS_PAGE,
  FRAGMENT_PROJECT_STATS_OVERVIEW_PAGE,
  FRAGMENT_REWARDS_SOLD_GRAPH_STATS,
} from '../fragments'

export const QUERY_PROJECT_STATS_OVERVIEW = gql`
  ${FRAGMENT_PROJECT_STATS_OVERVIEW_PAGE}
  query ProjectStatsGetOverView($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectStatsForOverviewPage
    }
  }
`

export const QUERY_PROJECT_STATS_INSIGHT = gql`
  ${FRAGMENT_PROJECT_STATS_INSIGHTS_PAGE}
  query ProjectStatsGetInsight($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectStatsForInsightsPage
    }
  }
`
export const QUERY_PROJECT_HISTORY_STATS = gql`
  ${FRAGMENT_PROJECT_HISTORY_STATS}
  query ProjectHistoryStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectHistoryStats
    }
  }
`

export const QUERY_PROJECT_REWARD_SOLD_GRAPH_STATS = gql`
  ${FRAGMENT_REWARDS_SOLD_GRAPH_STATS}
  query ProjectRewardSoldGraphStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectRewardSoldGraphStats
    }
  }
`

export const QUERY_PROJECT_FUNDING_METHOD_STATS = gql`
  ${FRAGMENT_FUNDING_METHOD_STATS}
  query ProjectFundingMethodStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectFundingMethodStats
    }
  }
`
