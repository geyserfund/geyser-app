import { gql } from '@apollo/client'

export const FRAGMENT_USER_ACCOUNT_KEYS = gql`
  fragment UserAccountKeys on UserAccountKeys {
    id
    rskKeyPair {
      address
      derivationPath
      publicKey
    }
    encryptedSeed
    createdAt
    userId
    updatedAt
  }
`
