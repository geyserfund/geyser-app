import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FOR_LANDING_PAGE = gql`
  fragment ProjectForLandingPage on Project {
    id
    name
    thumbnailImage
    shortDescription
    title
    status
  }
`
