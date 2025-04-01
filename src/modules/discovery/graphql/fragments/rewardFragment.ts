import { gql } from '@apollo/client'

export const FRAGMENT_REWARD_FOR_LANDING_PAGE = gql`
  fragment RewardForLandingPage on ProjectReward {
    id
    uuid
    images
    cost
    name
    description
    project {
      rewardCurrency
      id
      name
      title
      thumbnailImage
    }
  }
`

export const FRAGMENT_REWARD_FOR_PRODUCTS_PAGE = gql`
  fragment RewardForProductsPage on ProjectReward {
    id
    uuid
    images
    cost
    name
    description
    project {
      rewardCurrency
      id
      name
      title
      thumbnailImage
      category
      subCategory
    }
  }
`
