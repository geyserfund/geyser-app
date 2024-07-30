import { gql } from '@apollo/client'

import { FRAGMENT_FUNDING_TX } from '../fragments/funding'

export const PROJECT_FUNDING_SUBSCRIPTION = gql`
  ${FRAGMENT_FUNDING_TX}
  subscription FundingTxStatusUpdated($input: FundingTxStatusUpdatedInput) {
    fundingTxStatusUpdated(input: $input) {
      fundingTx {
        ...FundingTx
      }
    }
  }
`
