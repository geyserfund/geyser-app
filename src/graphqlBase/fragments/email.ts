import { gql } from '@apollo/client'

export const FRAGMENT_EMAIL_UPDATE_USER = gql`
  fragment EmailUpdateUser on User {
    email
    isEmailVerified
    id
  }
`

export const FRAGMENT_OTP_RESPONSE = gql`
  fragment OTPResponse on OTPResponse {
    otpVerificationToken
    expiresAt
  }
`
