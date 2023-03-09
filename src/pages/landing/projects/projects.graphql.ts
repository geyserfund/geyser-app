import { gql } from '@apollo/client'

export const ProjectParametersForLandingPage = `{
  id
  name
  balance
  createdAt
  fundersCount
  fundingTxsCount
  thumbnailImage
  shortDescription
  tags {
    id
    label
  }
  title
  status
  owners {
    id
    user {
      id
      username
      imageUrl
    }
  }
}`

export const QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE = gql`
  query ProjectsMostFundedOfTheWeekGet(
    $input: GetProjectsMostFundedOfTheWeekInput
  ) {
    projectsMostFundedOfTheWeekGet(input: $input) {
      project ${ProjectParametersForLandingPage}
    }
  }
`

export const QUERY_PROJECTS_FOR_LANDING_PAGE = gql`
  query Projects($input: ProjectsGetQueryInput) {
    projects(input: $input) {
      projects ${ProjectParametersForLandingPage}
    }
  }
`
export const QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE = gql`
query Project($where: UniqueProjectQueryInput!) {
  project(where: $where) ${ProjectParametersForLandingPage}
}
`
