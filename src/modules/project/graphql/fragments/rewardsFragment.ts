import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_REWARD = gql`
  fragment ProjectReward on ProjectReward {
    id
    name
    description
    shortDescription
    cost
    images
    deleted
    stock
    sold
    hasShipping
    maxClaimable
    rewardCurrency
    isAddon
    isHidden
    category
    preOrder
    estimatedAvailabilityDate
    estimatedDeliveryInWeeks
    confirmationMessage
    privateCommentPrompts
  }
`
