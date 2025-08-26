import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_PAGE_CREATOR } from './userFragment'

export const FRAGMENT_PROJECT_ENTRY = gql`
  ${FRAGMENT_PROJECT_PAGE_CREATOR}
  fragment ProjectEntry on Entry {
    id
    title
    description
    image
    type
    fundersCount
    amountFunded
    status
    content
    createdAt
    publishedAt
  }
`

export const FRAGMENT_PROJECT_ENTRY_VIEW = gql`
  fragment ProjectEntryView on Entry {
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
    content
    markdown
  }
`
