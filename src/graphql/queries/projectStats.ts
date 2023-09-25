import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_STATS_OVERVIEW_PAGE } from '../fragments'

export const QUERY_PROJECT_STATS_OVERVIEW = gql`
  ${FRAGMENT_PROJECT_STATS_OVERVIEW_PAGE}
  query ProjectStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectStatsForOverviewPage
    }
  }
`
