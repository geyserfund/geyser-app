import { gql } from '@apollo/client'

export const PROJECT_GOAL_FRAGMENT = gql`
  fragment ProjectGoalFields on ProjectGoal {
    id
    amountContributed
    targetAmount
    title
  }
`
