import { gql } from '@apollo/client'

/** Status of the durable direct AON claim attempt for a project, if any. */
export const QUERY_AON_CLAIM_STATUS = gql`
  query AonClaimStatus($projectId: BigInt!) {
    aonClaimStatus(projectId: $projectId) {
      status
      txHash
      failureReason
    }
  }
`

export type AonClaimUiStatus = 'NOT_STARTED' | 'PENDING' | 'CONFIRMED' | 'FAILED'

export type AonClaimStatusQuery = {
  aonClaimStatus: {
    __typename?: 'AonClaimStatusResponse'
    status: AonClaimUiStatus
    txHash?: string | null
    failureReason?: string | null
  }
}

export type AonClaimStatusQueryVariables = {
  projectId: string | number
}
