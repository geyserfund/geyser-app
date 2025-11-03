import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_AON_GOAL_FOR_PROJECT_PAGE = gql`
  fragment ProjectAonGoalForProjectPage on ProjectAonGoal {
    goalAmount
    balance
    goalDurationInDays
    deployedAt
    status
    contractAddress
  }
`

export const FRAGMENT_PROJECT_AON_GOAL_FOR_PROJECT_UPDATE = gql`
  fragment ProjectAonGoalForProjectUpdate on ProjectAonGoal {
    goalAmount
    goalDurationInDays
  }
`
