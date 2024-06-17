import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_REWARD = gql`
  fragment ProjectReward on ProjectReward {
    id
    name
    description
    cost
    image
    deleted
    stock
    sold
    hasShipping
    maxClaimable
    isAddon
    isHidden
    category
    preOrder
    estimatedAvailabilityDate
    estimatedDeliveryInWeeks
  }
`
