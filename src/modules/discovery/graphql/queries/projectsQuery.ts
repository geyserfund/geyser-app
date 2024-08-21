import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_LANDING_PAGE } from '../fragments/projectFragment'

export const QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query FeaturedProjectForLandingPage($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectForLandingPage
    }
  }
`

export const QUERY_PROJECTS_MOST_FUNDED_OF_THE_WEEK = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsMostFundedByTag($input: ProjectsMostFundedByTagInput!) {
    projectsMostFundedByTag(input: $input) {
      projects {
        project {
          ...ProjectForLandingPage
        }
      }
      tagId
    }
  }
`

export const QUERY_PROJECTS_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsForLandingPage($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        ...ProjectForLandingPage
      }
    }
  }
`
