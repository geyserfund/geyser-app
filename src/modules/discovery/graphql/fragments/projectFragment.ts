import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REVIEW } from '@/modules/project/graphql/fragments/projectReviewFragment.ts'

import { FRAGMENT_PROJECT_AON_GOAL_FOR_LANDING_PAGE } from './aonGoalFragment.ts'

export const FRAGMENT_PROJECT_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_PROJECT_AON_GOAL_FOR_LANDING_PAGE}
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
    fundingStrategy
    aonGoal {
      ...ProjectAonGoalForLandingPage
    }
    launchedAt
    owners {
      id
      user {
        id
        guardianType
        username
        imageUrl
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
  ${FRAGMENT_PROJECT_AON_GOAL_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_REVIEW}
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
    lastCreationStep
    fundingStrategy
    launchedAt
    rskEoa
    subCategory
    location {
      region
    }
    aonGoal {
      ...ProjectAonGoalForLandingPage
    }
    wallets {
      id
      name
      state {
        status
        statusCode
      }
    }
    reviews {
      ...ProjectReview
    }
  }
`

export const FRAGMENT_PROJECT_THUMBNAIL_IMAGE = gql`
  fragment ProjectThumbnailImage on Project {
    id
    title
    name
    thumbnailImage
  }
`
