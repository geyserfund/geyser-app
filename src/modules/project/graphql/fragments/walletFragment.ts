import { gql } from '@apollo/client'

export const FRAGMENT_WALLET_CONTRIBUTION_LIMIT = gql`
  fragment WalletContributionLimits on WalletContributionLimits {
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
`

export const FRAGMENT_PROJECT_PAGE_WALLET = gql`
  ${FRAGMENT_WALLET_CONTRIBUTION_LIMIT}
  fragment ProjectPageWallet on Wallet {
    id
    name
    feePercentage
    limits {
      contribution {
        ...WalletContributionLimits
      }
    }
    state {
      status
      statusCode
    }
  }
`

export const FRAGMENT_PROJECT_WALLET_CONNECTION_DETAILS = gql`
  fragment ProjectWalletConnectionDetails on Wallet {
    id
    connectionDetails {
      ... on LightningAddressConnectionDetails {
        lightningAddress
      }
      ... on LndConnectionDetailsPublic {
        pubkey
      }
      ... on LndConnectionDetailsPrivate {
        tlsCertificate
        pubkey
        macaroon
        lndNodeType
        hostname
        grpcPort
      }
      ... on NWCConnectionDetailsPrivate {
        nwcUrl
      }
    }
  }
`

export const FRAGMENT_PROJECT_WALLET_CREATION_DETAILS = gql`
  ${FRAGMENT_PROJECT_PAGE_WALLET}
  ${FRAGMENT_PROJECT_WALLET_CONNECTION_DETAILS}
  fragment ProjectPageWalletCreationDetails on Wallet {
    ...ProjectPageWallet
    ...ProjectWalletConnectionDetails
  }
`
