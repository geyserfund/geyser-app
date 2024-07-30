import { gql } from '@apollo/client'

import { FRAGMENT_USER_FOR_AVATAR } from './user'

export const FRAGMENT_ENTRY = gql`
  ${FRAGMENT_USER_FOR_AVATAR}
  fragment Entry on Entry {
    id
    title
    description
    image
    status
    content
    createdAt
    updatedAt
    publishedAt
    status
    fundersCount
    amountFunded
    type
    creator {
      ...UserForAvatar
    }
    project {
      id
      title
      name
      image
    }
  }
`

export const FRAGMENT_ENTRY_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_USER_FOR_AVATAR}
  fragment EntryForLandingPage on Entry {
    amountFunded
    entryFundersCount: fundersCount
    entryDescription: description
    id
    image
    title
    project {
      id
      name
      thumbnailImage
      title
    }
    creator {
      ...UserForAvatar
    }
  }
`

export const FRAGMENT_ENTRY_FOR_PROJECT = gql`
  ${FRAGMENT_USER_FOR_AVATAR}
  fragment EntryForProject on Entry {
    id
    title
    description
    image
    type
    fundersCount
    amountFunded
    status
    createdAt
    publishedAt
    creator {
      ...UserForAvatar
    }
  }
`
