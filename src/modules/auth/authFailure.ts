import { TFunction } from 'i18next'

export type AuthFailureCode =
  | 'WRONG_LOGIN_METHOD'
  | 'ACCOUNT_ALREADY_EXISTS'
  | 'OAUTH_EMAIL_ALREADY_EXISTS'
  | 'AUTHENTICATION_FAILED'
  | 'AUTH_RATE_LIMITED'

export const getAuthFailureMessage = (t: TFunction, code?: string, fallback?: string, provider?: string) => {
  switch (code) {
    case 'WRONG_LOGIN_METHOD':
      return t('No Geyser account uses this method. Try another login method or sign up.')
    case 'ACCOUNT_ALREADY_EXISTS':
      return t('This method already has a Geyser account. Sign in instead.')
    case 'OAUTH_EMAIL_ALREADY_EXISTS':
      return provider
        ? t(`An account already exists for this email. Sign in with email, then connect ${provider}.`)
        : t('An account already exists for this email. Sign in with email, then connect this provider.')
    case 'AUTH_RATE_LIMITED':
      return t('Too many authentication attempts. Please wait and try again.')
    default:
      return fallback || t('Please try again')
  }
}
