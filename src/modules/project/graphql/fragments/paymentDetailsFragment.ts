import { gql } from '@apollo/client'

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
    swapId
    swapMetadata
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

export const FRAGMENT_RSK_TO_ON_CHAIN_SWAP_PAYMENT_DETAILS = gql`
  fragment RskToOnChainSwapPaymentDetails on RskToOnChainSwapPaymentDetails {
    swapId
    swapMetadata
    swapPreimageHash
    onChainAddress
    onChainTxId
  }
`
