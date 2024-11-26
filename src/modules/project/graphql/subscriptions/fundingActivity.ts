import { gql } from '@apollo/client'

import { FRAGMENT_FUNDING_TX_FOR_SUBSCRIPTION } from '../fragments/fundingTxFragment'

export const PROJECT_FUNDING_SUBSCRIPTION = gql`
  ${FRAGMENT_FUNDING_TX_FOR_SUBSCRIPTION}
  subscription FundingTxStatusUpdated($input: FundingTxStatusUpdatedInput) {
    fundingTxStatusUpdated(input: $input) {
      fundingTx {
        ...FundingTxForSubscription
      }
    }
  }
`
