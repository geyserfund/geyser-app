import { gql } from '@apollo/client'

import { FRAGMENT_CONTRIBUTION_FOR_LANDING_PAGE } from '../fragments/contributionFragment.ts'

export const QUERY_LANDING_PAGE_FEATURED_CONTRIBUTIONS = gql`
  ${FRAGMENT_CONTRIBUTION_FOR_LANDING_PAGE}
  query LandingPageFeaturedContributionsGet($input: GetContributionsInput) {
    contributionsGet(input: $input) {
      pagination {
        take
        count
      }
      contributions {
        ...ContributionForLandingPage
      }
    }
  }
`
