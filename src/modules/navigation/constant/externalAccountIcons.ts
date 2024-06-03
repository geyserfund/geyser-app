import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'
import { RiTwitterXLine } from 'react-icons/ri'

import { BoltSvgIcon, FountainIcon, NostrSvgIcon } from '../../../components/icons'
import { ExternalAccountType } from '../../../pages/auth'

export const externalAccountIconMap = {
  [ExternalAccountType.github]: BsGithub,
  [ExternalAccountType.google]: BsGoogle,
  [ExternalAccountType.facebook]: BsFacebook,
  [ExternalAccountType.twitter]: RiTwitterXLine,
  [ExternalAccountType.lightning]: BoltSvgIcon,
  [ExternalAccountType.nostr]: NostrSvgIcon,
  [ExternalAccountType.fountain]: FountainIcon,
} as { [key: string]: any }
