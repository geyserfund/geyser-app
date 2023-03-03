import { gql } from '@apollo/client'

export const QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE = gql`
  query ProjectsMostFundedOfTheWeekGet(
    $input: GetProjectsMostFundedOfTheWeekInput
  ) {
    projectsMostFundedOfTheWeekGet(input: $input) {
    //   project ${ProjectParametersForLandingPage}
    }
  }
`
