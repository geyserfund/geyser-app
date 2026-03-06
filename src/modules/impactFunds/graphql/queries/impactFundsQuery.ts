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
      amountCommittedCurrency
      metrics {
        awardedTotalSats
        projectsFundedCount
      }
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
      amountCommittedCurrency
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
        tier
        status
      }
      archivedSponsors {
        id
        name
        image
        url
        amountContributedInSats
        tier
        status
      }
      metrics {
        awardedTotalSats
        projectsFundedCount
      }
      canAccessDashboard
    }
  }
`

export const QUERY_IMPACT_FUND_APPLICATIONS = gql`
  query ImpactFundApplications($input: ImpactFundApplicationsInput!) {
    impactFundApplications(input: $input) {
      totalCount
      applications {
        id
        amountAwardedInSats
        awardedAt
        contributionUuid
        status
        fundingModel
        project {
          id
          name
          title
          thumbnailImage
          shortDescription
        }
      }
    }
  }
`

export const QUERY_IMPACT_FUND_DASHBOARD_APPLICATIONS = gql`
  query ImpactFundDashboardApplications($input: ImpactFundDashboardApplicationsInput!) {
    impactFundDashboardApplications(input: $input) {
      totalCount
      applications {
        applicationId
        status
        fundingModel
        project {
          id
          name
          title
          thumbnailImage
          shortDescription
        }
        creator {
          id
          username
          email
        }
        projectPath
      }
    }
  }
`
