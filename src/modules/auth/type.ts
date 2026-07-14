import { ButtonProps } from '@chakra-ui/react'

export enum ExternalAccountType {
  nostr = 'nostr',
  twitter = 'twitter',
  lightning = 'lnurl',
  fountain = 'Fountain',
  facebook = 'facebook',
  google = 'google',
  github = 'github',
}

export enum SocialAccountType {
  facebook = 'facebook',
  google = 'google',
  github = 'github',
  twitter = 'twitter',
  nostr = 'nostr',
}

export const AuthFlowIntent = {
  login: 'LOGIN',
  signup: 'SIGNUP',
} as const

export type AuthFlowIntent = (typeof AuthFlowIntent)[keyof typeof AuthFlowIntent]

export const AuthMethod = {
  email: 'email',
} as const

export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod] | ExternalAccountType | SocialAccountType

export interface ConnectWithButtonProps extends ButtonProps {
  onClose?: () => void
  isIconOnly?: boolean
  showLastUsed?: boolean
  accountType: SocialAccountType
  authFlowIntent?: AuthFlowIntent
}
