import { gql } from '@apollo/client'

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
        regions {
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
      projectContributionsStats {
        contributions {
          count
          total
          totalUsd
        }
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
      projectContributionsStats {
        contributions {
          count
          total
          totalUsd
        }
      }
    }
  }
`

export const FRAGMENT_PROJECT_HISTORY_STATS = gql`
  fragment ProjectHistoryStats on ProjectStats {
    current {
      projectContributionsStats {
        contributions {
          graph {
            statType
            graphData {
              value
              dateTime
            }
          }
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

export const FRAGMENT_FUNDING_METHOD_STATS = gql`
  fragment ProjectFundingMethodStats on ProjectStats {
    current {
      projectContributionsStats {
        contributionsGroupedByMethod {
          count
          method
          total
          totalUsd
        }
      }
    }
  }
`
