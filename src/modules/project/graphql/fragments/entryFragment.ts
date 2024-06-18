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
    createdAt
    publishedAt
    creator {
      ...ProjectPageCreator
    }
  }
`
