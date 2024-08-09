import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FUNDER } from '../fragments/funderFragment'

export const QUERY_PROJECT_PAGE_FUNDERS = gql`
  ${FRAGMENT_PROJECT_FUNDER}
  query ProjectPageFunders($input: GetFundersInput!) {
    fundersGet(input: $input) {
      ...ProjectFunder
    }
  }
`
