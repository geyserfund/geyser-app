import { gql } from '@apollo/client'

export const MUTATION_UNLINK_ACCOUNT = gql`
  mutation UnlinkExternalAccount($id: BigInt!) {
    unlinkExternalAccount(id: $id) {
      id
      username
      imageUrl
      externalAccounts {
        id
        accountType
        externalUsername
        externalId
        public
      }
    }
  }
`

export const MUTATION_UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      __typename
      id
      wallet {
        connectionDetails {
          ... on LightningAddressConnectionDetails {
            lightningAddress
          }
        }
      }
      bio
      email
      username
      imageUrl
    }
  }
`
