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
