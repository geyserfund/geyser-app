import { gql } from '@apollo/client'

import {
  FRAGMENT_RSK_TO_LIGHTNING_SWAP_PAYMENT_DETAILS,
  FRAGMENT_RSK_TO_ON_CHAIN_SWAP_PAYMENT_DETAILS,
} from './paymentDetailsFragment.ts'
export const FRAGMENT_CONTRIBUTION_FEES = gql`
  fragment ContributionFees on PaymentFee {
    feeType
    feeAmount
    feePayer
    description
  }
`

export const FRAGMENT_CONTRIBUTION_LIGHTNING_PAYMENT_DETAILS = gql`
  ${FRAGMENT_CONTRIBUTION_FEES}
  fragment ContributionLightningPaymentDetails on ContributionLightningPaymentDetails {
    lightningInvoiceId
    paymentRequest
    amountDue
    fees {
      ...ContributionFees
    }
  }
`

export const FRAGMENT_CONTRIBUTION_ON_CHAIN_SWAP_PAYMENT_DETAILS = gql`
  ${FRAGMENT_CONTRIBUTION_FEES}
  fragment ContributionOnChainSwapPaymentDetails on ContributionOnChainSwapPaymentDetails {
    address
    swapJson
    amountDue
    fees {
      ...ContributionFees
    }
  }
`

export const FRAGMENT_CONTRIBUTION_FIAT_PAYMENT_DETAILS = gql`
  fragment ContributionFiatPaymentDetails on ContributionFiatPaymentDetails {
    stripeClientSecret
  }
`

export const FRAGMENT_CONTRIBUTION_FIAT_SWAP_PAYMENT_DETAILS = gql`
  fragment ContributionFiatSwapPaymentDetails on ContributionFiatToLightningSwapPaymentDetails {
    checkoutUrl
  }
`

export const FRAGMENT_CONTRIBUTION_LIGHTNING_TO_RSK_SWAP_PAYMENT_DETAILS = gql`
  ${FRAGMENT_CONTRIBUTION_FEES}
  fragment ContributionLightningToRskSwapPaymentDetails on ContributionLightningToRskSwapPaymentDetails {
    lightningInvoiceId
    paymentRequest
    swapJson
    paymentId
    amountToClaim
    amountDue
    fees {
      ...ContributionFees
    }
  }
`

export const FRAGMENT_CONTRIBUTION_ON_CHAIN_TO_RSK_SWAP_PAYMENT_DETAILS = gql`
  ${FRAGMENT_CONTRIBUTION_FEES}
  fragment ContributionOnChainToRskSwapPaymentDetails on ContributionOnChainToRskSwapPaymentDetails {
    address
    swapJson
    paymentId
    amountDue
    fees {
      ...ContributionFees
    }
  }
`

export const FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT_DETAILS = gql`
  ${FRAGMENT_CONTRIBUTION_LIGHTNING_PAYMENT_DETAILS}
  ${FRAGMENT_CONTRIBUTION_ON_CHAIN_SWAP_PAYMENT_DETAILS}
  ${FRAGMENT_CONTRIBUTION_FIAT_PAYMENT_DETAILS}
  ${FRAGMENT_CONTRIBUTION_FIAT_SWAP_PAYMENT_DETAILS}
  ${FRAGMENT_CONTRIBUTION_LIGHTNING_TO_RSK_SWAP_PAYMENT_DETAILS}
  ${FRAGMENT_CONTRIBUTION_ON_CHAIN_TO_RSK_SWAP_PAYMENT_DETAILS}
  fragment FundingContributionPaymentDetails on ContributionPaymentsDetails {
    lightning {
      ...ContributionLightningPaymentDetails
    }
    onChainSwap {
      ...ContributionOnChainSwapPaymentDetails
    }
    fiat {
      ...ContributionFiatPaymentDetails
    }
    fiatToLightningSwap {
      ...ContributionFiatSwapPaymentDetails
    }
    lightningToRskSwap {
      ...ContributionLightningToRskSwapPaymentDetails
    }
    onChainToRskSwap {
      ...ContributionOnChainToRskSwapPaymentDetails
    }
  }
`

export const FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT = gql`
  fragment FundingContributionPayment on Payment {
    id
    method
    paymentAmount
    paymentType
    status
  }
`

export const FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT_STATUS = gql`
  fragment FundingContributionPaymentStatus on Payment {
    id
    method
    paymentAmount
    paymentType
    status
    paymentDetails {
      ... on OnChainToLightningSwapPaymentDetails {
        swapId
      }
      ... on OnChainToRskSwapPaymentDetails {
        swapId
      }
      ... on LightningToRskSwapPaymentDetails {
        swapId
      }
    }
  }
`

export const FRAGMENT_PAYMENT_SUBSCRIPTION = gql`
  fragment PaymentSubscription on Payment {
    id
    status
    paymentType
    failureReason
  }
`

export const FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND = gql`
  ${FRAGMENT_RSK_TO_ON_CHAIN_SWAP_PAYMENT_DETAILS}
  ${FRAGMENT_RSK_TO_LIGHTNING_SWAP_PAYMENT_DETAILS}
  fragment PaymentForPayoutRefund on Payment {
    id
    method
    failureReason
    paymentType
    createdAt
    status
    linkedEntityUUID
    linkedEntityType
    paymentDetails {
      ... on RskToOnChainSwapPaymentDetails {
        ...RskToOnChainSwapPaymentDetails
      }
      ... on RskToLightningSwapPaymentDetails {
        ...RskToLightningSwapPaymentDetails
      }
    }
  }
`
