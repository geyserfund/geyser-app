import { gql } from '@apollo/client'

import {
  FRAGMENT_FUNDING_TX,
  FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS,
} from '../fragments/funding'

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

export const MUTATION_FUNDING_INVOICE_REFRESH = gql`
  ${FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS}
  mutation RefreshFundingInvoice($fundingTxID: BigInt!) {
    fundingInvoiceRefresh(fundingTxId: $fundingTxID) {
      ...FundingTxWithInvoiceStatus
    }
  }
`

export const MUTATION_FUNDING_INVOICE_CANCEL = gql`
  mutation FundingInvoiceCancel($invoiceId: String!) {
    fundingInvoiceCancel(invoiceId: $invoiceId) {
      id
      success
    }
  }
`
