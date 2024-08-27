import { gql } from '@apollo/client'

export const SUMMARY_BANNER_FRAGMENT = gql`
  fragment SummaryBannerFragment on ProjectsSummary {
    fundedTotal
    fundersCount
    projectsCount
  }
`
