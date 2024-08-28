import { gql } from '@apollo/client'

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
  query WalletLimit($getWalletId: BigInt!) {
    getWallet(id: $getWalletId) {
      limits {
        contribution {
          max
          min
        }
      }
    }
  }
`
