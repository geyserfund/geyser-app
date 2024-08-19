import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_STATS } from '../fragments/projectContributionsStatsFragment'

export const QUERY_PROJECT_STATS_GET = gql`
  ${FRAGMENT_PROJECT_STATS}
  query ProjectStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectStats
    }
  }
`
