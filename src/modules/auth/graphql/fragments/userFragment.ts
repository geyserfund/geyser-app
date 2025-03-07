import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_OWNER } from '@/graphqlBase/fragments/project.ts'

import { FRAGMENT_EXTERNAL_ACCOUNT } from './externalAccountFragment.ts'

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
    guardianType
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
