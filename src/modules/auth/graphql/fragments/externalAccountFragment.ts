import { gql } from '@apollo/client'

export const FRAGMENT_EXTERNAL_ACCOUNT = gql`
  fragment ExternalAccount on ExternalAccount {
    id
    accountType
    externalUsername
    externalId
    externalLink
    public
  }
`
