import { gql } from '@apollo/client'

export const FRAGMENT_ENTRY_FOR_LANDING_PAGE = gql`
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
      id
      imageUrl
      username
    }
  }
`

export const FRAGMENT_ENTRY_FOR_PROJECT = gql`
  fragment EntryForProject on Entry {
    id
    title
    description
    image
    type
    fundersCount
    amountFunded
    published
    status
    createdAt
    publishedAt
    creator {
      id
      username
      imageUrl
    }
  }
`
