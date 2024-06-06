import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_PAGE_BODY } from '../fragments/project'

export const QUERY_PROJECT_PAGE_BODY = gql`
  ${FRAGMENT_PROJECT_PAGE_BODY}
  query ProjectPageBody($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectPageBody
    }
  }
`
