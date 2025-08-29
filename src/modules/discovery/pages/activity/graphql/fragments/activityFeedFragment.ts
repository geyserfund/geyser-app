import { gql } from '@apollo/client'

export const ACTIVITY_FEED_FRAGMENT = gql`
  fragment ActivityFeedFragment on Activity {
    activityType
    createdAt
    id
    project {
      id
      title
      name
      thumbnailImage
      keys {
        nostrKeys {
          publicKey {
            hex
            npub
          }
        }
      }
    }
    resource {
      ... on Project {
        id
        title
        name
        thumbnailImage
      }
      ... on Entry {
        id
        title
        entryDescription: description
        content
        entryImage: image
      }
      ... on Post {
        id
        title
        entryDescription: description
        content
        entryImage: image
      }
      ... on Contribution {
        id
        amount
        projectId
        isAnonymous
        comment
        funder {
          user {
            id
            username
            imageUrl
            guardianType
          }
        }
      }
      ... on ProjectReward {
        id
        uuid
        category
        cost
        projectRewardDescription: description
        rewardCurrency
        sold
        stock
        projectRewardImage: images
      }
      ... on ProjectGoal {
        id
        currency
        goalDescription: description
        title
        targetAmount
        status
      }
    }
  }
`
