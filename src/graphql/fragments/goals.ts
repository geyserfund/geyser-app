import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_GOAL_DEFAULT = gql`
  fragment ProjectDefaultGoal on ProjectGoal {
    id
    title
    targetAmount
    currency
    amountContributed
  }
`

export const FRAGMENT_PROJECT_GOAL = gql`
  fragment ProjectGoal on ProjectGoal {
    id
    title
    description
    targetAmount
    currency
    status
    projectId
    amountContributed
    createdAt
    updatedAt
    hasReceivedContribution
    emojiUnifiedCode
  }
`
