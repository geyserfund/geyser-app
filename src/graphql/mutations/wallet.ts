import { gql } from '@apollo/client'

export const MUTATION_CREATE_WALLET = gql`
  mutation CreateWallet($input: CreateWalletInput!) {
    createWallet(input: $input) {
      id
      name
    }
  }
`

export const MUTATION_UPDATE_WALLET = gql`
  mutation UpdateWallet($input: UpdateWalletInput!) {
    updateWallet(input: $input) {
      id
      name
    }
  }
`

export const MUTATION_DELETE_WALLET = gql`
  mutation WalletDelete($walletDeleteId: BigInt!) {
    walletDelete(id: $walletDeleteId)
  }
`
