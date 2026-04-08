import { gql } from '@apollo/client'

import {
  FRAGMENT_PROJECT_ACTIVE_MATCHING,
  FRAGMENT_PROJECT_DASHBOARD_MATCHINGS,
} from '../fragments/projectMatchingFragment.ts'

export const QUERY_PROJECT_ACTIVE_MATCHING = gql`
  ${FRAGMENT_PROJECT_ACTIVE_MATCHING}
  query ProjectActiveMatchingGet($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectActiveMatching
    }
  }
`

export const QUERY_PROJECT_DASHBOARD_MATCHINGS = gql`
  ${FRAGMENT_PROJECT_DASHBOARD_MATCHINGS}
  query ProjectDashboardMatchingsGet($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectDashboardMatchings
    }
  }
`
