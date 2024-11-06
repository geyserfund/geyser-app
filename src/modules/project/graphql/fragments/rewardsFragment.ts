import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_REWARD = gql`
  fragment ProjectReward on ProjectReward {
    id
    uuid
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
    posts {
      id
      title
      postType
      description
      createdAt
    }
  }
`
export const FRAGMENT_POST_PAGE_PROJECT_REWARD = gql`
  fragment PostPageProjectReward on ProjectReward {
    id
    uuid
    name
    images
    shortDescription
    cost
  }
`
