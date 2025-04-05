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

export const QUERY_PROJECT_AMBASSADOR_LIST = gql`
  query ProjectAmbassadorList($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ambassadors {
        edges {
          node {
            id
            payoutRate
            contributionsCount
            user {
              imageUrl
              username
              id
            }
          }
        }
      }
    }
  }
`
