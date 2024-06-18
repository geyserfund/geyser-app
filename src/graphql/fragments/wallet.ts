import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_WALLET = gql`
  fragment ProjectWallet on Wallet {
    id
    name
    feePercentage
    state {
      status
      statusCode
    }
    connectionDetails {
      ... on LightningAddressConnectionDetails {
        lightningAddress
      }
      ... on LndConnectionDetailsPrivate {
        macaroon
        tlsCertificate
        hostname
        grpcPort
        lndNodeType
        pubkey
      }
      ... on LndConnectionDetailsPublic {
        pubkey
      }
    }
  }
`
export const FRAGMENT_WALLET_LIMIT = gql`
  fragment WalletLimits on WalletLimits {
    contribution {
      min
      max
      offChain {
        min
        max
      }
      onChain {
        min
        max
      }
    }
  }
`
