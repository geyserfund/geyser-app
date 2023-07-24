import { gql } from '@apollo/client'

import {
  FRAGMENT_EMAIL_UPDATE_USER,
  FRAGMENT_OTP_RESPONSE,
} from '../fragments/email'

export const MUTATION_SEND_OTP_BY_EMAIL = gql`
  ${FRAGMENT_OTP_RESPONSE}
  mutation SendOTPByEmail($input: SendOtpByEmailInput!) {
    sendOTPByEmail(input: $input) {
      ...OTPResponse
    }
  }
`

export const MUTATION_UPDATE_USER_EMAIL = gql`
  ${FRAGMENT_EMAIL_UPDATE_USER}
  mutation UserEmailUpdate($input: UserEmailUpdateInput!) {
    userEmailUpdate(input: $input) {
      ...EmailUpdateUser
    }
  }
`
export const MUTATION_VERIFY_USER_EMAIL = gql`
  mutation UserEmailVerify($input: EmailVerifyInput!) {
    userEmailVerify(input: $input)
  }
`
