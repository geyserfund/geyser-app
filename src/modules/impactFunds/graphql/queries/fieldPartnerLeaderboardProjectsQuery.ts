import { gql } from '@apollo/client'

export const QUERY_IMPACT_FUNDS_FIELD_PARTNER_LEADERBOARD_PROJECTS = gql`
  query ImpactFundsFieldPartnerLeaderboard($input: ImpactFundFieldPartnerLeaderboardInput) {
    impactFundFieldPartnerLeaderboard(input: $input) {
      rows {
        rank
        fieldPartnerId
        fieldPartner
        country
        projectsLaunched
        enabledContributionSats
      }
    }
  }
`
