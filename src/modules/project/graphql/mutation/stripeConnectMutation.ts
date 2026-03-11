import { gql } from '@apollo/client'

export const MUTATION_CREATE_STRIPE_CONNECT_ACCOUNT = gql`
  mutation CreateStripeConnectAccount($projectId: BigInt!, $returnUrl: String) {
    createStripeConnectAccount(projectId: $projectId, returnUrl: $returnUrl) {
      accountId
      onboardingUrl
      status {
        accountId
        chargesEnabled
        payoutsEnabled
        detailsSubmitted
        disabledReason
        isReady
      }
    }
  }
`

export const MUTATION_REFRESH_STRIPE_CONNECT_ONBOARDING_LINK = gql`
  mutation RefreshStripeConnectOnboardingLink($projectId: BigInt!, $returnUrl: String) {
    refreshStripeConnectOnboardingLink(projectId: $projectId, returnUrl: $returnUrl) {
      accountId
      onboardingUrl
      status {
        accountId
        chargesEnabled
        payoutsEnabled
        detailsSubmitted
        disabledReason
        isReady
      }
    }
  }
`
