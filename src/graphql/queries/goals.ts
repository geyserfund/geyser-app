import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_GOAL_INFO } from '../fragments/goals'

export const QUERY_PROJECT_GOAL_TO_DISPLAY = gql`
  ${FRAGMENT_PROJECT_GOAL_INFO}
  query ProjectGoals($projectId: BigInt!) {
    projectGoals(projectId: $projectId) {
      inProgress {
        ...ProjectGoal
      }
    }
  }
`
