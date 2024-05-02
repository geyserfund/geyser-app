import { gql } from '@apollo/client'

import { FRAGMENT_FRAGMENT_WALLET_LIMIT } from '../fragments/wallet'

export const QUERY_LIGHTNING_ADDRESS_VERIFY = gql`
  query LightningAddressVerify($lightningAddress: String) {
    lightningAddressVerify(lightningAddress: $lightningAddress) {
      reason
      valid
      limits {
        max
        min
      }
    }
  }
`

export const QUERY_WALLET_LIMITS = gql`
  ${FRAGMENT_FRAGMENT_WALLET_LIMIT}
  query WalletLimit($getWalletId: BigInt!) {
    getWallet(id: $getWalletId) {
      limits {
        ...WalletLimits
      }
    }
  }
`
