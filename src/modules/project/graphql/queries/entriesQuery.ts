import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_ENTRY } from '../fragments/entryFragment'

export const QUERY_PROJECT_ENTRIES = gql`
  ${FRAGMENT_PROJECT_ENTRY}
  query ProjectEntries($where: UniqueProjectQueryInput!, $input: ProjectEntriesGetInput) {
    projectGet(where: $where) {
      entries(input: $input) {
        ...ProjectEntry
      }
    }
  }
`

export const QUERY_PROJECT_UNPUBLISHED_ENTRIES = gql`
  ${FRAGMENT_PROJECT_ENTRY}
  query ProjectUnplublishedEntries($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      entries: entries(input: { where: { published: false } }) {
        ...ProjectEntry
      }
    }
  }
`
