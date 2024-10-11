import { PiFacebookLogo, PiGithubLogo, PiXLogo } from 'react-icons/pi'

import { GoogleGLogoIcon } from '../../components/icons/svg/GoogleGLogoIcon'
import { hasFacebookAccount, hasGithubAccount, hasGoogleAccount, hasTwitterAccount } from '../../utils'
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
}
