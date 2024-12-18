import { gql } from '@apollo/client'

export const FRAGMENT_GUARDIAN_USER = gql`
  fragment GuardianUser on GuardianUser {
    guardianType
    heroId
    imageUrl
    userId
    username
  }
`

export const FRAGMENT_GUARDIAN_RESULT = gql`
  ${FRAGMENT_GUARDIAN_USER}
  fragment GuardianResult on GuardianResult {
    guardianType
    soldCount
    users {
      ...GuardianUser
    }
  }
`
