import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'
import { RiTwitterXLine } from 'react-icons/ri'

import { NostrIcon } from '@/shared/components/icons'

import { BoltSvgIcon, FountainIcon } from '../../../components/icons'
import { ExternalAccountType } from '../../../modules/auth'

export const externalAccountIconMap = {
  [ExternalAccountType.github]: BsGithub,
  [ExternalAccountType.google]: BsGoogle,
  [ExternalAccountType.facebook]: BsFacebook,
  [ExternalAccountType.twitter]: RiTwitterXLine,
  [ExternalAccountType.lightning]: BoltSvgIcon,
  [ExternalAccountType.nostr]: NostrIcon,
  [ExternalAccountType.fountain]: FountainIcon,
} as { [key: string]: any }
