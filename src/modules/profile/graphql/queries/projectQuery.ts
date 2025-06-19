import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_PROFILE_CONTRIBUTIONS } from '../fragments/projectFragment'

export const QUERY_PROJECT_FOR_PROFILE_CONTRIBUTIONS = gql`
  ${FRAGMENT_PROJECT_FOR_PROFILE_CONTRIBUTIONS}
  query ProjectForProfileContributions($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectForProfileContributions
    }
  }
`
