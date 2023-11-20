import { ButtonProps } from '@chakra-ui/react'

export enum ExternalAccountType {
  nostr = 'nostr',
  twitter = 'twitter',
  lightning = 'lnurl',
  fountain = 'Fountain',
  facebook = 'facebook',
  google = 'google',
  github = 'github',
  apple = 'apple',
}

export interface ConnectWithButtonProps extends ButtonProps {
  onClose?: () => void
  isIconOnly?: boolean
}
