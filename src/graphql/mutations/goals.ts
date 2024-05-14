import { gql } from '@apollo/client'

export const MUTATION_CREATE_PROJECT_GOAL = gql`
  mutation ProjectGoalCreate($input: ProjectGoalCreateInput!) {
    projectGoalCreate(input: $input) {
      title
      description
      targetAmount
      projectId
      currency
    }
  }
`

export const MUTATION_UPDATE_PROJECT_GOAL = gql`
  mutation ProjectGoalUpdate($input: ProjectGoalUpdateInput!) {
    projectGoalUpdate(input: $input) {
      title
      targetAmount
      projectId
      description
      currency
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
