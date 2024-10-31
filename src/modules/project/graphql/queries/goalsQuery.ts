import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_GOALS } from '../fragments/goalsFragment'

export const QUERY_PROJECT_IN_PROGRESS_GOALS = gql`
  ${FRAGMENT_PROJECT_GOALS}
  query ProjectInProgressGoals($input: GetProjectGoalsInput!) {
    projectGoals(input: $input) {
      inProgress {
        ...ProjectGoals
      }
    }
  }
`

export const QUERY_PROJECT_COMPLETED_GOALS = gql`
  ${FRAGMENT_PROJECT_GOALS}
  query ProjectCompletedGoals($input: GetProjectGoalsInput!) {
    projectGoals(input: $input) {
      completed {
        ...ProjectGoals
      }
    }
  }
`

export const QUERY_PROJECT_GOAL = gql`
  ${FRAGMENT_PROJECT_GOALS}
  query ProjectGoal($input: BigInt!) {
    projectGoal(projectGoalId: $input) {
      posts {
        id
        title
        postType
        description
        createdAt
      }
      ...ProjectGoals
    }
  }
`
