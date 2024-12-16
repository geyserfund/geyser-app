import { gql } from '@apollo/client'

export const FRAGMENT_GUARDIAN_PROJECT_REWARD = gql`
  fragment GuardianProjectReward on ProjectReward {
    id
    uuid
    name
    cost
    maxClaimable
    sold
    rewardCurrency
    isHidden
  }
`
