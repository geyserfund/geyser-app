import { gql } from '@apollo/client'

import {
  FRAGMENT_PLEDGE_REFUND,
  FRAGMENT_PLEDGE_REFUND_METADATA,
  FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT,
} from '../fragments/refundsFragment'

export const MUTATION_PLEDGE_REFUND_REQUEST = gql`
  ${FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT}
  ${FRAGMENT_PLEDGE_REFUND_METADATA}
  mutation PledgeRefundRequest($input: PledgeRefundRequestInput!) {
    pledgeRefundRequest(input: $input) {
      refund {
        ...PledgeRefundWithPayment
      }
      refundMetadata {
        ...PledgeRefundMetadata
      }
      refundProcessingFee
    }
  }
`

export const MUTATION_PLEDGE_REFUND_PAYMENT_CREATE = gql`
  ${FRAGMENT_PLEDGE_REFUND}
  ${FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT}
  mutation PledgeRefundPaymentCreate($input: PledgeRefundPaymentCreateInput!) {
    pledgeRefundPaymentCreate(input: $input) {
      refund {
        ...PledgeRefund
      }
      swap
      payment {
        ...PaymentForPayoutRefund
      }
    }
  }
`

export const MUTATION_PLEDGE_REFUND_INITIATE = gql`
  ${FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT}
  mutation PledgeRefundInitiate($input: PledgeRefundInitiateInput!) {
    pledgeRefundInitiate(input: $input) {
      refund {
        ...PledgeRefund
      }
      txHash
    }
  }
`

export const MUTATION_RETRY_PLEDGE_REFUND_INITIATE = gql`
  ${FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT}
  mutation PledgeRefundRetryInitiate($input: PledgeRefundRetryInitiateInput!) {
    pledgeRefundRetryInitiate(input: $input) {
      swap
      refund {
        ...PledgeRefund
      }
      payment {
        id
        accountingAmountDue
      }
    }
  }
`
