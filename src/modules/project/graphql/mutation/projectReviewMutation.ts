import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REVIEW } from '../fragments/projectReviewFragment'

export const MUTATION_PROJECT_REVIEW_REQUEST = gql`
  ${FRAGMENT_PROJECT_REVIEW}
  mutation ProjectReviewRequest($input: ProjectReviewRequestInput!) {
    projectReviewRequest(input: $input) {
      ...ProjectReview
    }
  }
`
