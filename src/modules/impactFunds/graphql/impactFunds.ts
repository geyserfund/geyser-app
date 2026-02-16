import { gql } from '@apollo/client'

export const QUERY_IMPACT_FUNDS = gql`
  query ImpactFunds {
    impactFunds(status: LIVE) {
      id
      slug
      title
      subtitle
      heroImage
      amountCommitted
      status
    }
  }
`

export const QUERY_IMPACT_FUND = gql`
  query ImpactFund($input: ImpactFundGetInput!) {
    impactFund(input: $input) {
      id
      slug
      title
      subtitle
      description
      heroImage
      amountCommitted
      donateProjectName
      status
      liveSponsors {
        id
        name
        image
        url
        status
      }
      archivedSponsors {
        id
        name
        image
        url
        status
      }
      fundedApplications {
        id
        projectId
        amountAwardedInSats
        awardedAt
        contributionUuid
        status
        project {
          id
          title
          thumbnailImage
          shortDescription
        }
      }
      metrics {
        awardedThisYearSats
        projectsFundedCount
        reportsLabel
      }
    }
  }
`

export const MUTATION_IMPACT_FUND_APPLY = gql`
  mutation ImpactFundApply($input: ImpactFundApplyInput!) {
    impactFundApply(input: $input) {
      id
      impactFundId
      projectId
      status
    }
  }
`
