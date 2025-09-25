import { gql } from '@apollo/client'
export const ContributionFeesFragment = gql`
  fragment ContributionFees on PaymentFee {
    feeType
    feeAmount
    feePayer
    description
  }
`

export const ContributionLightningPaymentDetailsFragment = gql`
  fragment ContributionLightningPaymentDetails on ContributionLightningPaymentDetails {
    lightningInvoiceId
    paymentRequest
  }
`

export const ContributionOnChainSwapPaymentDetailsFragment = gql`
  fragment ContributionOnChainSwapPaymentDetails on ContributionOnChainSwapPaymentDetails {
    address
    swapJson
  }
`

export const ContributionFiatPaymentDetailsFragment = gql`
  fragment ContributionFiatPaymentDetails on ContributionFiatPaymentDetails {
    stripeClientSecret
  }
`

export const ContributionFiatSwapPaymentDetailsFragment = gql`
  fragment ContributionFiatSwapPaymentDetails on ContributionFiatSwapPaymentDetails {
    checkoutUrl
  }
`

export const ContributionLightningToRskSwapPaymentDetailsFragment = gql`
  ${ContributionFeesFragment}
  fragment ContributionLightningToRskSwapPaymentDetails on ContributionLightningToRskSwapPaymentDetails {
    lightningInvoiceId
    paymentRequest
    swapJson
    paymentId
    amountToClaim
    fees {
      ...ContributionFees
    }
  }
`

export const ContributionOnChainToRskSwapPaymentDetailsFragment = gql`
  ${ContributionFeesFragment}
  fragment ContributionOnChainToRskSwapPaymentDetails on ContributionOnChainToRskSwapPaymentDetails {
    address
    swapJson
    paymentId
    fees {
      ...ContributionFees
    }
  }
`

export const FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT_DETAILS = gql`
  ${ContributionLightningPaymentDetailsFragment}
  ${ContributionOnChainSwapPaymentDetailsFragment}
  ${ContributionFiatPaymentDetailsFragment}
  ${ContributionFiatSwapPaymentDetailsFragment}
  ${ContributionLightningToRskSwapPaymentDetailsFragment}
  ${ContributionOnChainToRskSwapPaymentDetailsFragment}
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
    fiatSwap {
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
    status
    userSubscriptionId
  }
`

export const FRAGMENT_PAYMENT_SUBSCRIPTION = gql`
  fragment PaymentSubscription on Payment {
    id
    status
    paymentType
    contributionUUID
    failureReason
  }
`
