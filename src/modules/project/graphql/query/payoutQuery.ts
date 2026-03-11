import { gql } from '@apollo/client'

import { FRAGMENT_PAYOUT_METADATA, FRAGMENT_PAYOUT_WITH_PAYMENT } from '../fragments/payoutFragment.ts'

export const QUERY_PAYOUT_GET = gql`
  ${FRAGMENT_PAYOUT_WITH_PAYMENT}
  ${FRAGMENT_PAYOUT_METADATA}
  query PayoutGet($input: PayoutGetInput!) {
    payoutGet(input: $input) {
      payout {
        ...PayoutWithPayment
      }
      payoutMetadata {
        ...PayoutMetadata
      }
    }
  }
`

export const QUERY_PAYOUT_ACTIVE = gql`
  ${FRAGMENT_PAYOUT_WITH_PAYMENT}
  ${FRAGMENT_PAYOUT_METADATA}
  query PayoutActive($projectId: BigInt!) {
    payoutActive(projectId: $projectId) {
      payout {
        ...PayoutWithPayment
      }
      payoutMetadata {
        ...PayoutMetadata
      }
    }
  }
`
