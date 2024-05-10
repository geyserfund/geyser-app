import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_GOAL_INFO = gql`
  fragment ProjectGoal on ProjectGoal {
    id
    title
    targetAmount
    currency
    amountContributed
  }
`
