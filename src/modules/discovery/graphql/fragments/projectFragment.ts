import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FOR_LANDING_PAGE = gql`
  fragment ProjectForLandingPage on Project {
    id
    name
    balance
    balanceUsdCent
    fundersCount
    thumbnailImage
    shortDescription
    title
    status
    balance
    balanceUsdCent
    owners {
      id
      user {
        id
        taxProfile {
          legalEntityType
          verified
          country
        }
      }
    }
  }
`

export const FRAGMENT_PROJECT_FOR_LAUNCHPAD_PAGE = gql`
  fragment ProjectForLaunchpadPage on Project {
    id
    name
    thumbnailImage
    shortDescription
    title
    status
    preLaunchedAt
    preLaunchExpiresAt
    balanceUsdCent
    category
    subCategory
    owners {
      id
      user {
        id
        taxProfile {
          legalEntityType
          verified
          country
        }
      }
    }
  }
`

export const FRAGMENT_PROJECT_FOR_MY_PROJECTS = gql`
  fragment ProjectForMyProjects on Project {
    id
    name
    balance
    fundersCount
    thumbnailImage
    title
    shortDescription
    createdAt
    status
    rewardsCount
    followersCount
    balanceUsdCent
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
