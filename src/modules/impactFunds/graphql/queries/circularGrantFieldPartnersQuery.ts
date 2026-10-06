import { gql } from '@apollo/client'

export const QUERY_IMPACT_FUNDS_CIRCULAR_GRANT_FIELD_PARTNERS = gql`
  query ImpactFundsCircularGrantFieldPartners($input: ProjectsGetQueryInput!) {
    projectsGet(input: $input) {
      projects {
        id
        balance
        status
        fieldPartner {
          id
          username
          location
        }
        location {
          country {
            name
          }
        }
      }
    }
  }
`
