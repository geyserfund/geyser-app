import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_THUMBNAIL_IMAGE } from '@/modules/discovery/graphql/fragments/projectFragment.ts'

import { FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND } from './paymentFragment.ts'

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

export const FRAGMENT_RSK_TO_LIGHTNING_SWAP_PAYMENT_DETAILS = gql`
  fragment RskToLightningSwapPaymentDetails on RskToLightningSwapPaymentDetails {
    swapId
    swapMetadata
    swapPreimageHash
    lightningInvoiceId
  }
`

export const FRAGMENT_PLEDGE_REFUND = gql`
  ${FRAGMENT_PROJECT_THUMBNAIL_IMAGE}
  ${FRAGMENT_LIGHTNING_TO_RSK_SWAP_PAYMENT_DETAILS}
  ${FRAGMENT_ON_CHAIN_TO_RSK_SWAP_PAYMENT_DETAILS}
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  fragment PledgeRefund on PledgeRefund {
    id
    amount
    status
    expiresAt
    project {
      ...ProjectThumbnailImage
    }
    payments {
      ...PaymentForPayoutRefund
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
