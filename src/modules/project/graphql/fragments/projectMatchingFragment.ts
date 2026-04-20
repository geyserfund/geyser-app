import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_MATCHING = gql`
  fragment ProjectMatching on ProjectMatching {
    id
    projectId
    sponsorName
    sponsorUrl
    referenceCurrency
    matchingType
    maxCapAmount
    status
    startDate
    totalMatchedAmount
    totalMatchedAmountSats
    totalMatchedAmountUsdCent
    remainingCapAmount
  }
`

export const FRAGMENT_PROJECT_MATCHING_DASHBOARD = gql`
  ${FRAGMENT_PROJECT_MATCHING}
  fragment ProjectMatchingDashboard on ProjectMatching {
    ...ProjectMatching
    ownerUserId
  }
`

export const FRAGMENT_PROJECT_ACTIVE_MATCHING = gql`
  ${FRAGMENT_PROJECT_MATCHING}
  fragment ProjectActiveMatching on Project {
    id
    activeMatching {
      ...ProjectMatching
    }
  }
`

export const FRAGMENT_PROJECT_DASHBOARD_MATCHINGS = gql`
  ${FRAGMENT_PROJECT_MATCHING_DASHBOARD}
  fragment ProjectDashboardMatchings on Project {
    id
    activeMatching {
      ...ProjectMatchingDashboard
    }
    matchings {
      ...ProjectMatchingDashboard
    }
  }
`
