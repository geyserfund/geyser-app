import { gql } from '@apollo/client'

export const FRAGMENT_USER_FOR_AVATAR = gql`
  fragment UserForAvatar on User {
    id
    imageUrl
    username
  }
`
