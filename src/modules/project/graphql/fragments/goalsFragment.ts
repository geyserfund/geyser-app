import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_GOALS = gql`
  fragment ProjectGoals on ProjectGoal {
    id
    title
    description
    targetAmount
    currency
    status
    projectId
    amountContributed
    progress
    createdAt
    updatedAt
    completedAt
    hasReceivedContribution
    emojiUnifiedCode
  }
`
