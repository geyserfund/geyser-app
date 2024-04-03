import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_WALLET } from '../fragments/wallet'

export const MUTATION_CREATE_WALLET = gql`
  ${FRAGMENT_PROJECT_WALLET}
  mutation CreateWallet($input: CreateWalletInput!) {
    walletCreate(input: $input) {
      ...ProjectWallet
    }
  }
`

export const MUTATION_UPDATE_WALLET = gql`
  mutation UpdateWallet($input: UpdateWalletInput!) {
    walletUpdate(input: $input) {
      id
      name
    }
  }
`

export const MUTATION_DELETE_WALLET = gql`
  mutation WalletDelete($walletId: BigInt!) {
    walletDelete(id: $walletId)
  }
`
