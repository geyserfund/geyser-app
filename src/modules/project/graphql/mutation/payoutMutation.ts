import { gql } from '@apollo/client'

import { FRAGMENT_PAYOUT, FRAGMENT_PAYOUT_METADATA } from '../fragments/payoutFragment.ts'
import { FRAGMENT_RSK_TO_LIGHTNING_SWAP_PAYMENT_DETAILS } from '../fragments/refundsFragment.ts'

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

export const MUTATION_PAYOUT_SWAP_CREATE = gql`
  ${FRAGMENT_RSK_TO_LIGHTNING_SWAP_PAYMENT_DETAILS}
  mutation PayoutSwapCreate($input: PayoutSwapCreateInput!) {
    payoutSwapCreate(input: $input) {
      payout {
        ...Payout
      }
      swap
      payment {
        id
        paymentDetails {
          ... on RskToLightningSwapPaymentDetails {
            ...RskToLightningSwapPaymentDetails
          }
        }
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
      txHash
    }
  }
`
