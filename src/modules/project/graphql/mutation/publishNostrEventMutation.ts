import { gql } from '@apollo/client'

export const PUBLISH_NOSTR_EVENT_MUTATION = gql`
  mutation PublishNostrEvent($event: String!) {
    publishNostrEvent(event: $event)
  }
`
