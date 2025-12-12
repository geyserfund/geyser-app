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
      refundProcessingFee
    }
  }
`

export const MUTATION_PLEDGE_REFUND_SWAP_CREATE = gql`
  mutation PledgeRefundSwapCreate($input: PledgeRefundSwapCreateInput!) {
    pledgeRefundSwapCreate(input: $input) {
      refund {
        ...PledgeRefund
      }
      swap
      payment {
        id
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
      txHash
    }
  }
`

export const MUTATION_PAYMENT_SWAP_CLAIM_TX_BROADCAST = gql`
  mutation PaymentSwapClaimTxBroadcast($input: PaymentSwapClaimTxBroadcastInput!) {
    paymentSwapClaimTxBroadcast(input: $input) {
      id
      success
      txHash
    }
  }
`

export const MUTATION_RETRY_PLEDGE_REFUND_REQUEST = gql`
  ${FRAGMENT_PLEDGE_REFUND}
  mutation PledgeRefundRetryRequest($input: PledgeRefundRetryRequestInput!) {
    pledgeRefundRetryRequest(input: $input) {
      swap
      refund {
        ...PledgeRefund
      }
      payment {
        id
        accountingAmountDue
        method
        failureReason
        paymentType
        createdAt
        status
        paymentDetails {
          ... on RskToOnChainSwapPaymentDetails {
            swapId
            swapMetadata
            onChainAddress
            onChainTxId
            swapPreimageHash
          }
          ... on RskToLightningSwapPaymentDetails {
            swapId
            swapMetadata
            lightningInvoiceId
            swapPreimageHash
          }
        }
      }
    }
  }
`

export const MUTATION_RETRY_PLEDGE_REFUND_INITIATE = gql`
  ${FRAGMENT_PLEDGE_REFUND}
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
