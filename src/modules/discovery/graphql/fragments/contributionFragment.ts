import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_THUMBNAIL_IMAGE } from './projectFragment.ts'

export const FRAGMENT_CONTRIBUTION_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_PROJECT_THUMBNAIL_IMAGE}
  fragment ContributionForLandingPage on Contribution {
    amount
    id
    projectId
    createdAt
    funder {
      id
      user {
        id
        heroId
        imageUrl
        guardianType
        username
      }
    }
    sourceResource {
      ... on Project {
        ...ProjectThumbnailImage
      }
    }
  }
`
