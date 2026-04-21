import { gql } from '@apollo/client'

export const FRAGMENT_USER_WALLET_CONNECTION_DETAILS = gql`
  fragment UserWalletConnectionDetails on Wallet {
    id
    connectionDetails {
      ... on LightningAddressConnectionDetails {
        lightningAddress
      }
      ... on NWCConnectionDetailsPrivate {
        nwcUrl
      }
    }
  }
`
