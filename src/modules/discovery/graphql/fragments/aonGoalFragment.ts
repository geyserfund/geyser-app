import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_AON_GOAL_FOR_LANDING_PAGE = gql`
  fragment ProjectAonGoalForLandingPage on ProjectAonGoal {
    goalAmount
    balance
    goalDurationInDays
    deployedAt
    endsAt
    status
  }
`
