import { gql } from '@apollo/client'

import { FRAGMENT_PAYOUT, FRAGMENT_PAYOUT_METADATA } from '../fragments/payoutFragment.ts'

export const MUTATION_PAYOUT_REQUEST = gql`
  ${FRAGMENT_PAYOUT}
  ${FRAGMENT_PAYOUT_METADATA}
  mutation PayoutRequest($input: PayoutRequestInput!) {
    payoutRequest(input: $input) {
      payout {
        ...Payout
      }
      payoutMetadata {
        swapContractAddress
        nonce
        aonContractAddress
      }
    }
  }
`

export const MUTATION_PAYOUT_INITIATE = gql`
  ${FRAGMENT_PAYOUT}
  mutation PayoutInitiate($input: PayoutInitiateInput!) {
    payoutInitiate(input: $input) {
      payout {
        ...Payout
      }
      swap
      payment {
        id
      }
    }
  }
`
