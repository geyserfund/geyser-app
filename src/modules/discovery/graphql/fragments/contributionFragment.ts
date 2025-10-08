import { gql } from '@apollo/client'

export const FRAGMENT_CONTRIBUTION_FOR_LANDING_PAGE = gql`
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
  }
`
