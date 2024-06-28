import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FUNDING_TX } from '../fragments/fundingTxFragment'

export const QUERY_PROJECT_PAGE_FUNDING_TX = gql`
  ${FRAGMENT_PROJECT_FUNDING_TX}
  query ProjectPageFundingTx($input: GetFundingTxsInput) {
    fundingTxsGet(input: $input) {
      fundingTxs {
        ...ProjectFundingTx
      }
    }
  }
`
