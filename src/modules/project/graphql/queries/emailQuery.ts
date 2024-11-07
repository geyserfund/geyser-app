import { gql } from '@apollo/client'

export const USER_EMAIL_IS_AVAILABLE_QUERY = gql`
  query UserEmailIsAvailable($email: String!) {
    userEmailIsAvailable(email: $email)
  }
`
