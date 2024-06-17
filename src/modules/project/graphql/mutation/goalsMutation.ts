import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_GOALS } from '../fragments/goalsFragment'

export const MUTATION_UPDATE_PROJECT_GOAL_ORDERING = gql`
  mutation ProjectGoalOrderingUpdate($input: ProjectGoalOrderingUpdateInput!) {
    projectGoalOrderingUpdate(input: $input) {
      id
    }
  }
`

export const MUTATION_CREATE_PROJECT_GOAL = gql`
  ${FRAGMENT_PROJECT_GOALS}
  mutation ProjectGoalCreate($input: ProjectGoalCreateInput!) {
    projectGoalCreate(input: $input) {
      ...ProjectGoals
    }
  }
`

export const MUTATION_UPDATE_PROJECT_GOAL = gql`
  ${FRAGMENT_PROJECT_GOALS}
  mutation ProjectGoalUpdate($input: ProjectGoalUpdateInput!) {
    projectGoalUpdate(input: $input) {
      ...ProjectGoals
    }
  }
`

export const MUTATION_DELETE_PROJECT_GOAL = gql`
  mutation ProjectGoalDelete($projectGoalId: BigInt!) {
    projectGoalDelete(projectGoalId: $projectGoalId) {
      success
    }
  }
`
