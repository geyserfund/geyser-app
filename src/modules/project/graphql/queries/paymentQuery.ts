import { gql } from '@apollo/client'

export const QUERY_PAYMENT_BY_ONCHAIN_SWAP_ID = gql`
  query PaymentByOnChainSwapId($input: PaymentGetInput!) {
    payment(input: $input) {
      id
    }
  }
`

export const QUERY_PAYMENT_RECOVERY_BY_CONTRIBUTION = gql`
  query PaymentRecoveryByContribution($input: PaymentRecoveryByContributionInput!) {
    paymentRecoveryByContribution(input: $input) {
      contribution {
        id
        uuid
        projectId
        createdAt
        bitcoinQuote {
          quote
          quoteCurrency
        }
      }
      project {
        id
        name
        title
        fundingStrategy
      }
      payments {
        id
        uuid
        status
        paymentType
        amount
        swapId
        swapMetadata
      }
    }
  }
`
