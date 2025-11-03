import { gql } from '@apollo/client'

export const MUTATION_TAG_CREATE = gql`
  mutation ProjectTagCreate($input: TagCreateInput!) {
    tagCreate(input: $input) {
      id
      label
    }
  }
`
