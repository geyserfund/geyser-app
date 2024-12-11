import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_PAYMENT_METHODS } from './paymentMethodsFragment'
import { FRAGMENT_PROJECT_PAGE_CREATOR } from './userFragment'

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
    goalsCount
    rewardsCount
    entriesCount
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

export const FRAGMENT_PROJECT_PAGE_DETAILS = gql`
  fragment ProjectPageDetails on Project {
    id
    name
    links
    location {
      ...ProjectLocation
    }
    tags {
      id
      label
    }
  }
`

export const FRAGMENT_PROJECT_HEADER_SUMMARY = gql`
  fragment ProjectHeaderSummary on Project {
    followersCount
    fundersCount
    fundingTxsCount
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
    location {
      country {
        name
        code
      }
      region
    }
    status
    links
    rewardCurrency
  }
`
