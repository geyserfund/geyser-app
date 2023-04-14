import { gql } from '@apollo/client'

import { FRAGMENT_FUNDING_TX_QUERY_FOR_LANDING_PAGE } from './activities'

export const QUERY_GET_FUNDING = gql`
  query GetFundingTx($id: BigInt!) {
    fundingTx(id: $id) {
      id
      invoiceId
      paymentRequest
      amount
      status
      comment
      media
      paidAt
      onChain
      source
      method
      projectId
      funder {
        user {
          id
          username
          imageUrl
        }
      }
    }
  }
`

export const QUERY_GET_FUNDING_TXS_LANDING = gql`
  ${FRAGMENT_FUNDING_TX_QUERY_FOR_LANDING_PAGE}
  query GetFundingTxs($input: GetFundingTxsInput) {
    getFundingTxs(input: $input) {
      ...FragmentFundingTxLandingPage
    }
  }
`
