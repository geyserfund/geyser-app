import { gql } from '@apollo/client'

export const MUTATION_APPLY_GRANT = gql`
  mutation Mutation($input: GrantApplyInput) {
    grantApply(input: $input) {
      status
    }
  }
`
