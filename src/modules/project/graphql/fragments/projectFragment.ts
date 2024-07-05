import { gql } from '@apollo/client'

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
  fragment ProjectPageBody on Project {
    id
    name
    title
    type
    thumbnailImage
    image
    shortDescription
    description
    balance
    balanceUsdCent
    defaultGoalId
    status
    rewardCurrency
    createdAt
    hasGoals
    hasRewards
    hasEntries
    keys {
      ...ProjectKeys
    }
    owners {
      id
      user {
        ...ProjectPageCreator
      }
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
  }
`
