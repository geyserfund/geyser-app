import { PiFacebookLogoFill, PiGithubLogoFill, PiGoogleLogoBold, PiXLogo } from 'react-icons/pi'

import { NostrIcon } from '@/shared/components/icons'

import { BoltSvgIcon, FountainIcon } from '../../../components/icons'
import { ExternalAccountType } from '../../../modules/auth'

export const externalAccountIconMap = {
  [ExternalAccountType.github]: PiGithubLogoFill,
  [ExternalAccountType.google]: PiGoogleLogoBold,
  [ExternalAccountType.facebook]: PiFacebookLogoFill,
  [ExternalAccountType.twitter]: PiXLogo,
  [ExternalAccountType.lightning]: BoltSvgIcon,
  [ExternalAccountType.nostr]: NostrIcon,
  [ExternalAccountType.fountain]: FountainIcon,
} as { [key: string]: any }
