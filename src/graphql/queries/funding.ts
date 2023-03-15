import { gql } from '@apollo/client'

import { FundingTxQueryParameterForLandingPage } from '../../pages/landing/feed/activity.graphql'

/**
 * - https://github.com/geyserfund/geyser-server/blob/fa64826471/src/typeDefs/funding.ts
 * - [`FundingTx` type](https://github.com/geyserfund/geyser-server/blob/fa64826471/src/typeDefs/funding.ts#L44)
 */
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

/**
 * - https://github.com/geyserfund/geyser-server/blob/fa64826471/src/typeDefs/funding.ts
 * - [`FundingTx` type](https://github.com/geyserfund/geyser-server/blob/fa64826471/src/typeDefs/funding.ts#L44)
 */
export const QUERY_GET_FUNDING_TXS_LANDING = gql`
  query GetFundingTxs($input: GetFundingTxsInput) {
    getFundingTxs(input: $input) ${FundingTxQueryParameterForLandingPage}
  }
`
