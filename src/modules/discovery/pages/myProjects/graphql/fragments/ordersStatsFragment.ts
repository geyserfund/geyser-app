import { gql } from '@apollo/client'

export const ORDERS_STATS_FRAGMENT = gql`
  fragment OrdersStatsFragment on OrdersStatsBase {
    projectRewards {
      count
    }
    projectRewardsGroupedByProjectRewardId {
      count
      projectReward {
        id
        uuid
        name
        image
        sold
        maxClaimable
      }
    }
  }
`
