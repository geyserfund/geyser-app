import { PiFacebookLogo, PiGithubLogo, PiXLogo } from 'react-icons/pi'

import { NostrIcon } from '@/shared/components/icons/NostrIcon.tsx'

import { GoogleGLogoIcon } from '../../components/icons/svg/GoogleGLogoIcon'
import { hasFacebookAccount, hasGithubAccount, hasGoogleAccount, hasNostrAccount, hasTwitterAccount } from '../../utils'
import { SocialAccountType } from './type'

type SocialConfigType = {
  hasSocialAccount: (user: any) => boolean
  icon: React.ElementType
  label: string
}

export const SocialConfig: { [key in SocialAccountType]: SocialConfigType } = {
  github: {
    hasSocialAccount: (profile) => hasGithubAccount(profile),
    icon: PiGithubLogo,
    label: 'Github',
  },
  google: {
    hasSocialAccount: (profile) => hasGoogleAccount(profile),
    icon: GoogleGLogoIcon,
    label: 'Google',
  },
  twitter: {
    hasSocialAccount: (profile) => hasTwitterAccount(profile),
    icon: PiXLogo,
    label: 'Twitter (X)',
  },
  facebook: {
    hasSocialAccount: (profile) => hasFacebookAccount(profile),
    icon: PiFacebookLogo,
    label: 'Facebook',
  },
  nostr: {
    hasSocialAccount: (profile) => hasNostrAccount(profile),
    icon: NostrIcon,
    label: 'Nostr',
  },
}
