import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_PAGE_CREATOR = gql`
  fragment ProjectPageCreator on User {
    id
    imageUrl
    username
    externalAccounts {
      accountType
      externalUsername
      externalId
      id
      public
    }
  }
`
