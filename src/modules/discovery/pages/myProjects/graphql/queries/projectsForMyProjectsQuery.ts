import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_MY_PROJECTS } from '@/modules/discovery/graphql/fragments/projectFragment.ts'

export const QUERY_PROJECTS_FOR_MY_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_MY_PROJECTS}
  query ProjectsForMyProjects($input: ProjectsGetQueryInput!) {
    projectsGet(input: $input) {
      projects {
        ...ProjectForMyProjects
      }
    }
  }
`
