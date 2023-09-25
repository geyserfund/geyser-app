import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_STATS_OVERVIEW_PAGE = gql`
  fragment ProjectStatsForOverviewPage on ProjectStats {
    current {
      projectFundingTxs {
        amountSum
      }
      projectFunders {
        count
      }
      projectFunderRewards {
        quantitySum
      }
    }
    prevTimeRange {
      projectFundingTxs {
        amountSum
      }
      projectFunders {
        count
      }
      projectFunderRewards {
        quantitySum
      }
    }
  }
`

export const FRAGMENT_PROJECT_STATS_INSIGHTS_PAGE = gql`
  fragment ProjectStatsForInsightsPage on ProjectStats {
    current {
      projectViews {
        viewCount
        visitorCount
        referrers {
          value
          viewCount
          visitorCount
        }
        countries {
          value
          viewCount
          visitorCount
        }
      }
      projectFunderRewards {
        quantitySum
      }
      projectFunders {
        count
      }
      projectFundingTxs {
        amountSum
      }
    }
    prevTimeRange {
      projectViews {
        viewCount
        visitorCount
      }
      projectFunderRewards {
        quantitySum
      }
      projectFunders {
        count
      }
      projectFundingTxs {
        amountSum
      }
    }
  }
`

export const FRAGMENT_PROJECT_HISTORY_STATS = gql`
  fragment ProjectHistoryStats on ProjectStats {
    current {
      projectFundingTxs {
        amountGraph {
          dateTime
          sum
        }
      }
      projectViews {
        visitorGraph {
          viewCount
          visitorCount
          dateTime
        }
      }
    }
  }
`

export const FRAGMENT_REWARDS_SOLD_GRAPH_STATS = gql`
  fragment ProjectRewardSoldGraphStats on ProjectStats {
    current {
      projectFunderRewards {
        quantityGraph {
          dateTime
          rewardId
          rewardName
          sum
        }
      }
    }
  }
`
