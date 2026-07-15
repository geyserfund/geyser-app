import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_LANDING_PAGE } from '@/modules/discovery/graphql/fragments/projectFragment.ts'

export const QUERY_FIELD_PARTNER_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query FieldPartnerProjects($input: ProjectsGetQueryInput!) {
    projectsGet(input: $input) {
      projects {
        ...ProjectForLandingPage
      }
    }
  }
`
