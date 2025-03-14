import { gql } from '@apollo/client'

export const MUTATION_USER_VERIFICATION_TOKEN_GENERATE = gql`
  mutation UserVerificationTokenGenerate($input: UserVerificationTokenGenerateInput!) {
    userVerificationTokenGenerate(input: $input) {
      token
      verificationLevel
    }
  }
`
