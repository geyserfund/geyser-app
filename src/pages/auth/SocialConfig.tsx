import { BsFacebook, BsGithub } from 'react-icons/bs'
import { RiTwitterXLine } from 'react-icons/ri'

import { GoogleGLogoIcon } from '../../components/icons/svg/GoogleGLogoIcon'
import {
  hasFacebookAccount,
  hasGithubAccount,
  hasGoogleAccount,
  hasTwitterAccount,
} from '../../utils'
import { SocialAccountType } from './type'

type SocialConfigType = {
  hasSocialAccount: (user: any) => boolean
  icon: JSX.Element
  label: string
}

export const SocialConfig: { [key in SocialAccountType]: SocialConfigType } = {
  github: {
    hasSocialAccount: hasGithubAccount,
    icon: <BsGithub fontSize={'20px'} />,
    label: 'Github',
  },
  google: {
    hasSocialAccount: hasGoogleAccount,
    icon: <GoogleGLogoIcon boxSize={'20px'} />,
    label: 'Google',
  },
  twitter: {
    hasSocialAccount: hasTwitterAccount,
    icon: <RiTwitterXLine fontSize={'20px'} />,
    label: 'Twitter (X)',
  },
  facebook: {
    hasSocialAccount: hasFacebookAccount,
    icon: <BsFacebook fontSize={'20px'} />,
    label: 'Facebook',
  },
}
