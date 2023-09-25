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
