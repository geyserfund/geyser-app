import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_GOALS } from '../fragments/goalsFragment'

export const QUERY_PROJECT_IN_PROGRESS_GOALS = gql`
  ${FRAGMENT_PROJECT_GOALS}
  query ProjectInProgressGoals($projectId: BigInt!) {
    projectGoals(projectId: $projectId) {
      inProgress {
        ...ProjectGoals
      }
    }
  }
`

export const QUERY_PROJECT_COMPLETED_GOALS = gql`
  ${FRAGMENT_PROJECT_GOALS}
  query ProjectCompletedGoals($projectId: BigInt!) {
    projectGoals(projectId: $projectId) {
      completed {
        ...ProjectGoals
      }
    }
  }
`
