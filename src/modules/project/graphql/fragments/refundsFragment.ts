import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_THUMBNAIL_IMAGE } from '@/modules/discovery/graphql/fragments/projectFragment.ts'

export const FRAGMENT_PAYMENT_REFUND = gql`
  fragment PaymentRefund on PaymentRefund {
    id
    amount
    status
  }
`

export const FRAGMENT_LIGHTNING_TO_RSK_SWAP_PAYMENT_DETAILS = gql`
  fragment LightningToRskSwapPaymentDetails on LightningToRskSwapPaymentDetails {
    swapMetadata
    swapId
    refundPublicKey
    swapPreimageHash
    claimPublicKey
  }
`

export const FRAGMENT_ON_CHAIN_TO_RSK_SWAP_PAYMENT_DETAILS = gql`
  fragment OnChainToRskSwapPaymentDetails on OnChainToRskSwapPaymentDetails {
    swapMetadata
    swapId
    swapPreimageHash
    onChainTxId
    onChainAddress
  }
`

export const FRAGMENT_PLEDGE_REFUND = gql`
  ${FRAGMENT_PROJECT_THUMBNAIL_IMAGE}
  ${FRAGMENT_LIGHTNING_TO_RSK_SWAP_PAYMENT_DETAILS}
  ${FRAGMENT_ON_CHAIN_TO_RSK_SWAP_PAYMENT_DETAILS}
  fragment PledgeRefund on PledgeRefund {
    id
    amount
    status
    expiresAt
    project {
      ...ProjectThumbnailImage
    }
    payments {
      id
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
          # lightningInvoiceStatus
          swapPreimageHash
        }
      }
    }
  }
`

export const FRAGMENT_PLEDGE_REFUND_METADATA = gql`
  fragment PledgeRefundMetadata on PledgeRefundMetadata {
    nonce
    swapContractAddress
    aonContractAddress
  }
`
