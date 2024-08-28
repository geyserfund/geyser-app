import { gql } from '@apollo/client'

import {
  FRAGMENT_FUNDING_TX_DOWNLOAD_INVOICE,
  FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS,
  FRAGMENT_PROJECT_FUNDING_TX,
} from '../fragments/fundingTxFragment'

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

export const QUERY_FUNDING_TX_STATUS_AND_INVOICE_STATUS = gql`
  ${FRAGMENT_FUNDING_TX_WITH_INVOICE_STATUS}
  query FundingTxWithInvoiceStatus($fundingTxID: BigInt!) {
    fundingTx(id: $fundingTxID) {
      ...FundingTxWithInvoiceStatus
    }
  }
`

export const QUERY_FUNDING_TX_FOR_DOWNLOAD_INVOICE = gql`
  ${FRAGMENT_FUNDING_TX_DOWNLOAD_INVOICE}
  query FundingTxForDownloadInvoice($fundingTxId: BigInt!) {
    fundingTx(id: $fundingTxId) {
      ...FundingTxForDownloadInvoice
    }
  }
`
