import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_ENTRY, FRAGMENT_PROJECT_ENTRY_VIEW } from '../fragments/entryFragment'

export const QUERY_PROJECT_ENTRIES = gql`
  ${FRAGMENT_PROJECT_ENTRY}
  query ProjectEntries($where: UniqueProjectQueryInput!, $input: ProjectEntriesGetInput) {
    projectGet(where: $where) {
      id
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
      id
      entries: entries(input: { where: { published: false } }) {
        ...ProjectEntry
      }
    }
  }
`

export const QUERY_ENTRY = gql`
  ${FRAGMENT_PROJECT_ENTRY_VIEW}
  query ProjectEntry($entryId: BigInt!) {
    entry(id: $entryId) {
      ...ProjectEntryView
    }
  }
`
