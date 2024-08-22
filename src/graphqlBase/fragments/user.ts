import { gql } from '@apollo/client'

export const FRAGMENT_EXTERNAL_ACCOUNT = gql`
  fragment ExternalAccount on ExternalAccount {
    id
    accountType
    externalUsername
    externalId
    public
  }
`

export const FRAGMENT_PROJECT_OWNER_USER = gql`
  ${FRAGMENT_EXTERNAL_ACCOUNT}
  fragment ProjectOwnerUser on User {
    id
    username
    imageUrl
    email
    ranking
    isEmailVerified
    externalAccounts {
      ...ExternalAccount
    }
    hasSocialAccount
  }
`

export const FRAGMENT_USER_ME = gql`
  ${FRAGMENT_EXTERNAL_ACCOUNT}
  fragment UserMe on User {
    id
    username
    imageUrl
    email
    ranking
    isEmailVerified
    hasSocialAccount
    externalAccounts {
      ...ExternalAccount
    }
    ownerOf {
      project {
        id
        name
        image
        thumbnailImage
        title
        status
        createdAt
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
      hasSocialAccount
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
