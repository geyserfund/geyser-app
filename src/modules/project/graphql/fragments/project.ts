import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_PAGE_CREATOR } from './user'

export const FRAGMENT_PROJECT_PAGE_BODY = gql`
  ${FRAGMENT_PROJECT_PAGE_CREATOR}
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
    owners {
      id
      user {
        ...ProjectPageCreator
      }
    }
  }
`
