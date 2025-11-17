import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FOR_PROFILE_PAGE = gql`
  fragment ProjectForProfilePage on Project {
    id
    name
    balance
    fundersCount
    thumbnailImage
    title
    shortDescription
    createdAt
    status
    rejectionReason
    rewardsCount
    wallets {
      id
      name
      state {
        status
        statusCode
      }
    }
  }
`

export const FRAGMENT_PROJECT_FOR_PROFILE_CONTRIBUTIONS = gql`
  fragment ProjectForProfileContributions on Project {
    id
    name
    title
    thumbnailImage
    fundingStrategy
    status
    aonGoal {
      balance
      goalAmount
      status
    }
  }
`
