import { gql } from '@apollo/client'

import {
  FRAGMENT_FUNDING_TX,
  FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS,
} from '../queries'

export const MUTATION_FUND = gql`
  ${FRAGMENT_FUNDING_TX}
  mutation Fund($input: FundingInput!) {
    fund(input: $input) {
      fundingTx {
        ...FundingTx
      }
      amountSummary {
        total
        donationAmount
        shippingCost
        rewardsCost
      }
    }
  }
`

export const REFRESH_FUNDING_INVOICE = gql`
  ${FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS}
  mutation RefreshFundingInvoice($fundingTxID: BigInt!) {
    fundingInvoiceRefresh(fundingTxId: $fundingTxID) {
      ...FundingTxWithInvoiceStatus
    }
  }
`
