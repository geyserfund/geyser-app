import { gql } from '@apollo/client'

/** Prepare AON claim-to-EOA: claimable amount, creator address, and claim calldata */
export const MUTATION_AON_CLAIM_PREPARE = gql`
  mutation AonClaimPrepare($projectId: BigInt!) {
    aonClaimPrepare(projectId: $projectId) {
      contractAddress
      claimableAmountSats
      processingFeeSats
      creatorAddress
      claimCalldata
      simulationOk
    }
  }
`

/** Broadcast a creator-signed AON claim() transaction */
export const MUTATION_AON_CLAIM_BROADCAST = gql`
  mutation AonClaimBroadcast($projectId: BigInt!, $signedTxHex: String!) {
    aonClaimBroadcast(projectId: $projectId, signedTxHex: $signedTxHex) {
      txHash
    }
  }
`

export type AonClaimPrepareMutation = {
  aonClaimPrepare: {
    __typename?: 'AonClaimPrepareResponse'
    contractAddress: string
    claimableAmountSats: number
    processingFeeSats: number
    creatorAddress: string
    claimCalldata: string
    simulationOk: boolean
  }
}

export type AonClaimPrepareMutationVariables = {
  projectId: string | number
}

export type AonClaimBroadcastMutation = {
  aonClaimBroadcast: {
    __typename?: 'AonClaimBroadcastResponse'
    txHash: string
  }
}

export type AonClaimBroadcastMutationVariables = {
  projectId: string | number
  signedTxHex: string
}
