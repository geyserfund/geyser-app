import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_PAYMENT_METHODS } from './paymentMethodsFragment'
import { FRAGMENT_PROJECT_PAGE_CREATOR } from './userFragment'

export const FRAGMENT_PROJECT = gql`
  fragment Project on Project {
    id
    title
    name
    type
    shortDescription
    description
    defaultGoalId
    balance
    balanceUsdCent
    createdAt
    updatedAt
    images
    thumbnailImage
    links
    status
    rewardCurrency
    fundersCount
    contributionsCount
  }
`

export const FRAGMENT_PROJECT_NOSTR_KEYS = gql`
  fragment ProjectNostrKeys on Project {
    id
    name
    keys {
      nostrKeys {
        privateKey {
          nsec
        }
        publicKey {
          npub
        }
      }
    }
  }
`

export const FRAGMENT_PROJECT_AVATAR = gql`
  fragment ProjectAvatar on Project {
    id
    name
    thumbnailImage
    title
  }
`

export const FRAGMENT_PROJECT_LOCATION = gql`
  fragment ProjectLocation on Location {
    country {
      code
      name
    }
    region
  }
`

export const FRAGMENT_PROJECT_KEYS = gql`
  fragment ProjectKeys on ProjectKeys {
    nostrKeys {
      publicKey {
        hex
        npub
      }
    }
  }
`

export const FRAGMENT_PROJECT_PAGE_BODY = gql`
  ${FRAGMENT_PROJECT_PAGE_CREATOR}
  ${FRAGMENT_PROJECT_LOCATION}
  ${FRAGMENT_PROJECT_KEYS}
  ${FRAGMENT_PROJECT_PAYMENT_METHODS}
  fragment ProjectPageBody on Project {
    id
    name
    title
    type
    thumbnailImage
    images
    shortDescription
    description
    balance
    balanceUsdCent
    defaultGoalId
    status
    rewardCurrency
    createdAt
    launchedAt
    preLaunchedAt
    preLaunchExpiresAt
    paidLaunch
    goalsCount
    rewardsCount
    entriesCount
    promotionsEnabled
    followersCount
    rejectionReason
    fundingStrategy
    lastCreationStep
    category
    subCategory
    links
    aonGoalDurationInDays
    aonGoalInSats
    aonGoalStatus
    launchScheduledAt
    location {
      ...ProjectLocation
    }
    tags {
      id
      label
    }
    keys {
      ...ProjectKeys
    }
    owners {
      id
      user {
        ...ProjectPageCreator
      }
    }
    paymentMethods {
      ...ProjectPaymentMethods
    }
  }
`

export const FRAGMENT_PROJECT_HEADER_SUMMARY = gql`
  fragment ProjectHeaderSummary on Project {
    followersCount
    fundersCount
    contributionsCount
  }
`

export const FRAGMENT_PROJECT_UPDATE = gql`
  fragment ProjectUpdate on Project {
    id
    title
    name
    shortDescription
    description
    images
    thumbnailImage
    promotionsEnabled
    location {
      country {
        name
        code
      }
      region
    }
    status
    links
    category
    subCategory
    rewardCurrency
    fundingStrategy
    lastCreationStep
    aonGoalDurationInDays
    aonGoalInSats
    launchScheduledAt
  }
`
