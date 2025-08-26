import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_ENTRY_VIEW } from '../fragments/entryFragment'

export const MUTATION_DELETE_ENTRY = gql`
  mutation DeleteEntry($deleteEntryId: BigInt!) {
    deleteEntry(id: $deleteEntryId) {
      id
      title
    }
  }
`

export const MUTATION_CREATE_ENTRY = gql`
  ${FRAGMENT_PROJECT_ENTRY_VIEW}
  mutation CreateEntry($input: CreateEntryInput!) {
    createEntry(input: $input) {
      ...ProjectEntryView
    }
  }
`

export const MUTATION_UPDATE_ENTRY = gql`
  ${FRAGMENT_PROJECT_ENTRY_VIEW}
  mutation UpdateEntry($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      ...ProjectEntryView
    }
  }
`

export const MUTATION_PUBLISH_ENTRY = gql`
  ${FRAGMENT_PROJECT_ENTRY_VIEW}
  mutation PublishEntry($id: BigInt!) {
    publishEntry(id: $id) {
      ...ProjectEntryView
    }
  }
`

export const MUTATION_POST_REPOST_ON_NOSTR = gql`
  mutation PostRepostOnNostr($input: PostRepostOnNostrInput!) {
    postRepostOnNostr(input: $input) {
      success
    }
  }
`
