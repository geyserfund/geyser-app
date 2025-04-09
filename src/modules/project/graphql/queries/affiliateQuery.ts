import { gql } from '@apollo/client'

export const QUERY_GEYSER_PROMOTIONS_CONTRIBUTION_STATS = gql`
  query GeyserPromotionsContributionStats($input: GeyserPromotionsContributionStatsInput!) {
    geyserPromotionsContributionStats(input: $input) {
      contributionsCount
      contributionsSum
      contributionsSumUsd
    }
  }
`
