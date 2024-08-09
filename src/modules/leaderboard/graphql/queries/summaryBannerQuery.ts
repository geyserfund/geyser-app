import { gql } from '@apollo/client'

import { SUMMARY_BANNER_FRAGMENT } from '../fragments/summaryBannerFragment'

export const QUERY_SUMMARY_BANNER = gql`
  ${SUMMARY_BANNER_FRAGMENT}
  query ProjectsSummary {
    projectsSummary {
      ...SummaryBannerFragment
    }
  }
`
