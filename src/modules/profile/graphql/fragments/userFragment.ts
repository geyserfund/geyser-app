import { gql } from '@apollo/client'

import { FRAGMENT_EXTERNAL_ACCOUNT } from '@/graphqlBase/fragments'

export const FRAGMENT_USER_FOR_PROFILE_PAGE = gql`
  ${FRAGMENT_EXTERNAL_ACCOUNT}
  fragment UserForProfilePage on User {
    id
    bio
    heroId
    username
    imageUrl
    ranking
    guardian
    isEmailVerified
    externalAccounts {
      ...ExternalAccount
    }
  }
`
