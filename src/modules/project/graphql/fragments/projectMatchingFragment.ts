import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_MATCHING = gql`
  fragment ProjectMatching on ProjectMatching {
    id
    projectId
    ownerUserId
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
  ${FRAGMENT_PROJECT_MATCHING}
  fragment ProjectDashboardMatchings on Project {
    id
    activeMatching {
      ...ProjectMatching
    }
    matchings {
      ...ProjectMatching
    }
  }
`
