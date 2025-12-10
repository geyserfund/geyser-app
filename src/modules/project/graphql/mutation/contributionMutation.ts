import { gql } from '@apollo/client'

import { FRAGMENT_FUNDING_CONTRIBUTION } from '../fragments/contributionFragment.ts'
import { FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT_DETAILS } from '../fragments/paymentFragment.ts'
export const MUTATION_CONTRIBUTION_CREATE = gql`
  ${FRAGMENT_FUNDING_CONTRIBUTION}
  ${FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT_DETAILS}
  mutation ContributionCreate($input: ContributionCreateInput!) {
    contributionCreate(input: $input) {
      contribution {
        ...FundingContribution
      }
      payments {
        ...FundingContributionPaymentDetails
      }
    }
  }
`

export const MUTATION_FUNDING_EMAIL_UPDATE = gql`
  mutation ContributionEmailUpdate($input: ContributionEmailUpdateInput) {
    contributionEmailUpdate(input: $input) {
      id
      email
    }
  }
`

export const MUTATION_FUNDING_FIAT_SWAP_PAYMENT_CREATE = gql`
  mutation FundingFiatSwapPaymentCreate($input: ContributionPaymentsAddInput!) {
    contributionPaymentsAdd(input: $input) {
      payments {
        fiatToLightningSwap {
          checkoutUrl
        }
      }
    }
  }
`

export const MUTATION_PAYMENT_SWAP_CLAIM_TX_SET = gql`
  mutation PaymentSwapClaimTxSet($input: PaymentSwapClaimTxSetInput!) {
    paymentSwapClaimTxSet(input: $input) {
      id
      success
    }
  }
`
