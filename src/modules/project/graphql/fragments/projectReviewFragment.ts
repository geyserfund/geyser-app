import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_REVIEW = gql`
  fragment ProjectReview on ProjectReview {
    id
    reviewedAt
    status
    rejectionReasons
    reviewNotes
    version
  }
`
