import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_MATCHING } from '../fragments/projectMatchingFragment'

export const MUTATION_PROJECT_MATCHING_CREATE = gql`
  ${FRAGMENT_PROJECT_MATCHING}
  mutation ProjectMatchingCreate($input: ProjectMatchingCreateInput!) {
    projectMatchingCreate(input: $input) {
      ...ProjectMatching
    }
  }
`

export const MUTATION_PROJECT_MATCHING_UPDATE = gql`
  ${FRAGMENT_PROJECT_MATCHING}
  mutation ProjectMatchingUpdate($input: ProjectMatchingUpdateInput!) {
    projectMatchingUpdate(input: $input) {
      ...ProjectMatching
    }
  }
`

export const MUTATION_PROJECT_MATCHING_DELETE = gql`
  mutation ProjectMatchingDelete($input: ProjectMatchingDeleteInput!) {
    projectMatchingDelete(input: $input) {
      success
      message
      matchingId
    }
  }
`
