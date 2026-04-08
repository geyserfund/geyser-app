import { gql } from '@apollo/client'

export const MUTATION_PROJECT_SUBSCRIPTION_PLAN_CREATE = gql`
  mutation ProjectSubscriptionPlanCreate($input: CreateProjectSubscriptionPlanInput!) {
    projectSubscriptionPlanCreate(input: $input) {
      id
      projectId
      name
      description
      image
      interval
      amountUsdCent
      amountBtcSat
      isHidden
    }
  }
`

export const MUTATION_PROJECT_SUBSCRIPTION_PLAN_UPDATE = gql`
  mutation ProjectSubscriptionPlanUpdate($input: UpdateProjectSubscriptionPlanInput!) {
    projectSubscriptionPlanUpdate(input: $input) {
      id
      projectId
      name
      description
      image
      interval
      amountUsdCent
      amountBtcSat
      isHidden
    }
  }
`

export const MUTATION_PROJECT_SUBSCRIPTION_PLAN_DELETE = gql`
  mutation ProjectSubscriptionPlanDelete($id: BigInt!) {
    projectSubscriptionPlanDelete(id: $id)
  }
`
