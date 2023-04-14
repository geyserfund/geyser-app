import { gql } from '@apollo/client'

export const MUTATION_APPLY_GRANT = gql`
  mutation GrantApply($input: GrantApplyInput) {
    grantApply(input: $input) {
      status
    }
  }
`
