import { gql } from '@apollo/client'

/** Fetches only the launch project fields required to prepare the launch-fee payment claim. */
export const QUERY_LAUNCH_PAYMENT_PROJECT = gql`
  query LaunchPaymentProject($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      id
      fundingStrategy
      rskEoa
      aonGoal {
        contractAddress
      }
    }
  }
`
