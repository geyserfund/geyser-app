import { gql } from '@apollo/client'

export const QUERY_PROJECT_AON_GOAL = gql`
  query ProjectAonGoal($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      aonGoal {
        ...ProjectAonGoalForProjectPage
      }
    }
  }
`
