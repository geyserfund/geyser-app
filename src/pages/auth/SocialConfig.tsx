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
    hasSocialAccount: (profile) => hasGithubAccount(profile),
    icon: <BsGithub fontSize={'20px'} />,
    label: 'Login with Github',
  },
  google: {
    hasSocialAccount: (profile) => hasGoogleAccount(profile),
    icon: <GoogleGLogoIcon boxSize={'20px'} />,
    label: 'Login with Google',
  },
  twitter: {
    hasSocialAccount: (profile) => hasTwitterAccount(profile),
    icon: <RiTwitterXLine fontSize={'20px'} />,
    label: 'Login with Twitter (X)',
  },
  facebook: {
    hasSocialAccount: (profile) => hasFacebookAccount(profile),
    icon: <BsFacebook fontSize={'20px'} />,
    label: 'Login with Facebook',
  },
}
