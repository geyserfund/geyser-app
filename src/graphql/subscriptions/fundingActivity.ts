import { gql } from '@apollo/client'

import { FundingTxWithInvoiceStatusFragmentDoc } from '../../types'

export const PROJECT_FUNDING_SUBSCRIPTION = gql`
  ${FundingTxWithInvoiceStatusFragmentDoc}
  subscription ActivityCreated($input: ActivityCreatedSubscriptionInput) {
    activityCreated(input: $input) {
      ... on FundingTx {
        ...FundingTxWithInvoiceStatus
      }
    }
  }
`
