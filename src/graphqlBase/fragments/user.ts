import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_OWNER } from './project'

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
  ${FRAGMENT_PROJECT_FOR_OWNER}
  fragment UserMe on User {
    id
    username
    heroId
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
        ...ProjectForOwner
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
      heroId
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
