import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_AON_GOAL_FOR_PROJECT_PAGE } from '../fragments/projectAognGoalFragment.ts'

export const QUERY_PROJECT_AON_GOAL = gql`
  ${FRAGMENT_PROJECT_AON_GOAL_FOR_PROJECT_PAGE}
  query ProjectAonGoal($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      aonGoal {
        ...ProjectAonGoalForProjectPage
      }
    }
  }
`
