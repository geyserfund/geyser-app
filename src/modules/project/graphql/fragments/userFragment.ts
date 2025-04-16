import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_PAGE_CREATOR = gql`
  fragment ProjectPageCreator on User {
    id
    imageUrl
    username
    email
    guardianType
    externalAccounts {
      accountType
      externalUsername
      externalId
      id
      public
    }
    taxProfile {
      id
      country
      legalEntityType
    }
    complianceDetails {
      verifiedDetails {
        email {
          verified
          verifiedAt
        }
        identity {
          verified
          verifiedAt
        }
        phoneNumber {
          verified
          verifiedAt
        }
      }
    }
  }
`

export const FRAGMENT_USER_AVATAR = gql`
  fragment UserAvatar on User {
    id
    imageUrl
    username
    guardianType
  }
`

export const FRAGMENT_PROJECT_OWNER_USER_FOR_INVOICE = gql`
  fragment ProjectOwnerUserForInvoice on User {
    id
    username
    complianceDetails {
      verifiedDetails {
        identity {
          verifiedAt
          verified
        }
      }
    }
  }
`
