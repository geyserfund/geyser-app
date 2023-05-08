import { gql } from '@apollo/client'

export const QUERY_LIGHTNING_ADDRESS_VERIFY = gql`
  query LightningAddressVerify($lightningAddress: String) {
    lightningAddressVerify(lightningAddress: $lightningAddress) {
      reason
      valid
    }
  }
`
