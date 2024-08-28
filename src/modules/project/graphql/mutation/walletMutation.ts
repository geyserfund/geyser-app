import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_WALLET_CONNECTION_DETAILS } from '../fragments/walletFragment'

export const MUTATION_CREATE_WALLET = gql`
  ${FRAGMENT_PROJECT_WALLET_CONNECTION_DETAILS}
  mutation CreateWallet($input: CreateWalletInput!) {
    walletCreate(input: $input) {
      ...ProjectWalletConnectionDetails
    }
  }
`

export const MUTATION_UPDATE_WALLET = gql`
  ${FRAGMENT_PROJECT_WALLET_CONNECTION_DETAILS}
  mutation UpdateWallet($input: UpdateWalletInput!) {
    walletUpdate(input: $input) {
      ...ProjectWalletConnectionDetails
    }
  }
`
