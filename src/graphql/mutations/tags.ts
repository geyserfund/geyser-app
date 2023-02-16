import { gql } from '@apollo/client'

export const MUTATION_PROJECT_TAG_ADD = gql`
  mutation Mutation($input: ProjectTagMutationInput!) {
    projectTagAdd(input: $input) {
      id
      label
    }
  }
`

export const MUTATION_PROJECT_TAG__REMOVE = gql`
  mutation ProjectTagRemove($input: ProjectTagMutationInput!) {
    projectTagRemove(input: $input) {
      id
      label
    }
  }
`
export const MUTATION_TAG_CREATE = gql`
  mutation TagCreate($input: TagCreateInput!) {
    tagCreate(input: $input) {
      id
      label
    }
  }
`
