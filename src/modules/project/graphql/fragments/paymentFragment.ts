import { gql } from '@apollo/client'

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

export const FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT_DETAILS = gql`
  ${ContributionLightningPaymentDetailsFragment}
  ${ContributionOnChainSwapPaymentDetailsFragment}
  ${ContributionFiatPaymentDetailsFragment}
  ${ContributionFiatSwapPaymentDetailsFragment}
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
