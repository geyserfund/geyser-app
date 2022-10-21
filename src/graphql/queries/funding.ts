import { gql } from '@apollo/client';

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
      funder {
        user {
          id
          username
          imageUrl
        }
      }
    }
  }
`;

/**
 * - https://github.com/geyserfund/geyser-server/blob/fa64826471/src/typeDefs/funding.ts
 * - [`FundingTx` type](https://github.com/geyserfund/geyser-server/blob/fa64826471/src/typeDefs/funding.ts#L44)
 */
export const QUERY_GET_FUNDING_TXS_LANDING = gql`
  query GetFundingTxs($input: GetFundingTxsInput) {
    getFundingTxs(input: $input) {
      id
      comment
      amount
      funder {
        user {
          id
          username
        }
      }
      paidAt
      onChain
      media
      sourceResource {
        ... on Project {
          id
          name
          title
          media
        }
        ... on Entry {
          id
          image
        }
      }
    }
  }
`;

export const QUERY_GET_FUNDING_STATUS = gql`
  query GetFundingTxStatus($id: BigInt!) {
    fundingTx(id: $id) {
      status
    }
  }
`;
