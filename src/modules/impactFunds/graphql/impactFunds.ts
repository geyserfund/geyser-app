import { gql } from '@apollo/client'

export const QUERY_IMPACT_FUNDS = gql`
  query ImpactFunds {
    impactFunds(status: LIVE) {
      id
      name
      tags
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
      name
      tags
      title
      subtitle
      description
      heroImage
      amountCommitted
      donateProjectId
      donateProject {
        id
        name
      }
      status
      liveSponsors {
        id
        name
        image
        url
        amountContributedInSats
        status
      }
      archivedSponsors {
        id
        name
        image
        url
        amountContributedInSats
        status
      }
      fundedApplications {
        id
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
        awardedTotalSats
        projectsFundedCount
      }
    }
  }
`

export const MUTATION_IMPACT_FUND_APPLY = gql`
  mutation ImpactFundApply($input: ImpactFundApplyInput!) {
    impactFundApply(input: $input) {
      id
      impactFundId
      status
    }
  }
`
