import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_REWARD } from '../fragments/rewardsFragment'

export const MUTATION_UPDATE_PROJECT_REWARD = gql`
  ${FRAGMENT_PROJECT_REWARD}
  mutation RewardUpdate($input: UpdateProjectRewardInput!) {
    projectRewardUpdate(input: $input) {
      ...ProjectReward
    }
  }
`

export const MUTATION_DELETE_PROJECT_REWARD = gql`
  mutation RewardDelete($input: DeleteProjectRewardInput!) {
    projectRewardDelete(input: $input)
  }
`

export const MUTATION_CREATE_PROJECT_REWARD = gql`
  ${FRAGMENT_PROJECT_REWARD}
  mutation ProjectRewardCreate($input: CreateProjectRewardInput!) {
    projectRewardCreate(input: $input) {
      ...ProjectReward
    }
  }
`

export const MUTATION_CREATE_PAYMENT_SWAP_REFUND_TX_BROADCAST = gql`
  mutation PaymentSwapRefundTxBroadcast($input: PaymentSwapRefundTxBroadcastInput!) {
    paymentSwapRefundTxBroadcast(input: $input) {
      id
      success
      txHash
    }
  }
`
