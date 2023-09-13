import { gql } from '@apollo/client'

export const FRAGMENT_USER_ME = gql`
  fragment UserMe on User {
    id
    username
    imageUrl
    email
    ranking
    isEmailVerified
    externalAccounts {
      id
      accountType
      externalUsername
      externalId
      public
    }
    ownerOf {
      project {
        id
        name
        image
        thumbnailImage
        title
        status
      }
    }
  }
`

export const FRAGMENT_USER_FOR_AVATAR = gql`
  fragment UserForAvatar on User {
    id
    imageUrl
    email
    username
  }
`

export const FRAGMENT_FUNDER_WITH_USER = gql`
  fragment FunderWithUser on Funder {
    amountFunded
    confirmed
    id
    confirmedAt
    timesFunded
    user {
      id
      username
      externalAccounts {
        externalId
        externalUsername
        id
        accountType
      }
      imageUrl
    }
  }
`
