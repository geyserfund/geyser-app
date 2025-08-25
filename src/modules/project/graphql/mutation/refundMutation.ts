import { gql } from '@apollo/client'

import { FRAGMENT_PLEDGE_REFUND, FRAGMENT_PLEDGE_REFUND_METADATA } from '../fragments/refundsFragment'

export const MUTATION_PLEDGE_REFUND_REQUEST = gql`
  ${FRAGMENT_PLEDGE_REFUND}
  ${FRAGMENT_PLEDGE_REFUND_METADATA}
  mutation PledgeRefundRequest($input: PledgeRefundRequestInput!) {
    pledgeRefundRequest(input: $input) {
      refund {
        ...PledgeRefund
      }
      refundMetadata {
        ...PledgeRefundMetadata
      }
    }
  }
`

export const MUTATION_PLEDGE_REFUND_INITIATE = gql`
  ${FRAGMENT_PLEDGE_REFUND}
  mutation PledgeRefundInitiate($input: PledgeRefundInitiateInput!) {
    pledgeRefundInitiate(input: $input) {
      refund {
        ...PledgeRefund
      }
      swap
    }
  }
`
