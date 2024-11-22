import { gql } from '@apollo/client'

export const QUERY_PROJECT_AMBASSADOR_STATS = gql`
  query ProjectAmbassadorStats($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ambassadors {
        stats {
          contributionsCount
          contributionsSum
          count
        }
      }
    }
  }
`
