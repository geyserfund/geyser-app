import { gql } from '@apollo/client'

import { FRAGMENT_EXTERNAL_ACCOUNT } from '@/modules/auth/graphql/fragments/externalAccountFragment.ts'

export const FRAGMENT_USER_FOR_PROFILE_PAGE = gql`
  ${FRAGMENT_EXTERNAL_ACCOUNT}
  fragment UserForProfilePage on User {
    id
    bio
    heroId
    username
    imageUrl
    ranking
    guardianType
    isEmailVerified
    externalAccounts {
      ...ExternalAccount
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
