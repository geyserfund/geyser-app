import { gql } from '@apollo/client'

import { FRAGMENT_FUNDING_TX } from '../fragments/funding'

// Replace line 11 and 12 with 6 & 7 after the update from backend is up.
// subscription fundingTxStatusUpdated($input: FundingTxStatusUpdatedInput) {
//   fundingTxStatusUpdated(input: $input) {

export const PROJECT_FUNDING_SUBSCRIPTION = gql`
  ${FRAGMENT_FUNDING_TX}
  subscription fundingTxStatusUpdated {
    fundingTxStatusUpdated {
      fundingTx {
        ...FundingTx
      }
    }
  }
`
