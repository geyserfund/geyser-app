import { gql } from '@apollo/client'

export const ACTIVITY_FEED_FRAGMENT = gql`
  fragment ActivityFeedFragment on Activity {
    activityType
    createdAt
    id
    projectId
    resource {
      ... on Project {
        id
        title
        name
        image
      }
      ... on Entry {
        id
        title
        entryDescription: description
        content
      }
      ... on FundingTx {
        id
        amount
        projectId
        isAnonymous
        funder {
          user {
            id
            username
            imageUrl
          }
        }
      }
      ... on ProjectReward {
        category
        cost
        projectRewardDescription: description
        rewardCurrency
        rewardType
        sold
        stock
      }
      ... on ProjectGoal {
        currency
        goalDescription: description
        title
        targetAmount
        status
      }
    }
  }
`
