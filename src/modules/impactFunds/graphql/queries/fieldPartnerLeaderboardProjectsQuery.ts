import { gql } from '@apollo/client'

export const QUERY_IMPACT_FUNDS_FIELD_PARTNER_LEADERBOARD_PROJECTS = gql`
  query ImpactFundsFieldPartnerLeaderboardProjects($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        id
        title
        balance
        fieldPartner {
          id
          username
          location
        }
        location {
          country {
            name
          }
          region
        }
        tags {
          id
          label
        }
      }
    }
  }
`
