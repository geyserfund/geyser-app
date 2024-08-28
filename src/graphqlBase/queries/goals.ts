import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_GOAL, FRAGMENT_PROJECT_GOAL_DEFAULT } from '../fragments/goals'

export const QUERY_PROJECT_DEFAULT_GOAL = gql`
  ${FRAGMENT_PROJECT_GOAL_DEFAULT}
  query ProjectDefaultGoal($input: GetProjectGoalsInput!) {
    projectGoals(input: $input) {
      inProgress {
        ...ProjectDefaultGoal
      }
    }
  }
`

export const QUERY_PROJECT_GOALS = gql`
  ${FRAGMENT_PROJECT_GOAL}
  query ProjectGoals($input: GetProjectGoalsInput!) {
    projectGoals(input: $input) {
      inProgress {
        ...ProjectGoal
      }
      completed {
        ...ProjectGoal
        completedAt
      }
    }
  }
`
