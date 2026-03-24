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

export const QUERY_PROMOTION_NETWORK_CONTRIBUTION_STATS = gql`
  query PromotionNetworkContributionStats {
    promotionNetworkContributionStats {
      contributionsCount
      contributionsSum
      contributionsSumUsd
    }
  }
`

export const QUERY_USER_AFFILIATE_PARTNER_TERMS = gql`
  query UserAffiliatePartnerTerms($where: UserGetInput!) {
    user(where: $where) {
      id
      affiliatePartnerTerms {
        contributionReferralPayoutRate
        projectReferralPayoutRate
        projectReferralPayoutCapSats
      }
    }
  }
`
