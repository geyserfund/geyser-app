import { Link } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'
import { PiFacebookLogo, PiGithubLogo, PiGoogleLogo, PiInstagramLogo, PiLightning, PiXLogo } from 'react-icons/pi'

import { ExternalAccountType } from '../../../modules/auth'
import { ExternalAccount } from '../../../types'
import { NostrIcon } from '../../components/icons'

interface GetExternalAccountsProps {
  accounts?: ExternalAccount[]
}

export type ExternalAccountButtonReturnType = {
  key: string
  icon: React.ReactNode
  username: string
  account: ExternalAccount
  props?: {
    as: any
    isExternal: boolean
    href: string
  }
}

export const getExternalAccountsButtons = ({
  accounts,
}: GetExternalAccountsProps): ExternalAccountButtonReturnType[] => {
  if (accounts) {
    const returnAccounts = [] as ExternalAccountButtonReturnType[]

    accounts.map((account) => {
      const isTwitter = account.accountType === ExternalAccountType.twitter
      if (isTwitter) {
        returnAccounts.push({
          key: ExternalAccountType.twitter,
          icon: <PiXLogo />,
          username: account.externalUsername,
          account,
          props: {
            as: Link,
            isExternal: true,
            href: `https://twitter.com/${account.externalUsername}`,
          },
        })
      }

      const isNostr = account.accountType === ExternalAccountType.nostr
      if (isNostr) {
        const npub = nip19.npubEncode(account.externalId)
        returnAccounts.push({
          key: ExternalAccountType.nostr,
          icon: <NostrIcon height="16px" width="16px" />,
          username: npub,
          account,
          props: {
            as: Link,
            isExternal: true,
            href: `https://primal.net/p/${npub}`,
          },
        })
      }

      const isGithub = account.accountType === ExternalAccountType.github
      if (isGithub) {
        returnAccounts.push({
          key: ExternalAccountType.github,
          icon: <PiGithubLogo />,
          username: account.externalUsername,
          account,
          props: {
            as: Link,
            isExternal: true,
            href: `https://github.com/${account.externalUsername}`,
          },
        })
      }

      const isGoggle = account.accountType === ExternalAccountType.google
      if (isGoggle) {
        returnAccounts.push({
          key: ExternalAccountType.google,
          icon: <PiGoogleLogo />,
          username: account.externalUsername,
          account,
        })
      }

      const isFacebook = account.accountType === ExternalAccountType.facebook
      if (isFacebook) {
        returnAccounts.push({
          key: ExternalAccountType.facebook,
          icon: <PiFacebookLogo />,
          username: account.externalUsername,
          account,
          ...(account.externalLink && {
            props: {
              as: Link,
              isExternal: true,
              href: account.externalLink,
            },
          }),
        })
      }

      const isInstagram = account.accountType === ExternalAccountType.instagram
      if (isInstagram) {
        returnAccounts.push({
          key: ExternalAccountType.instagram,
          icon: <PiInstagramLogo />,
          username: account.externalUsername,
          account,
          props: {
            as: Link,
            isExternal: true,
            href: `https://instagram.com/${account.externalUsername}`,
          },
        })
      }

      const isLightning = account.accountType === ExternalAccountType.lightning
      if (isLightning) {
        returnAccounts.push({
          key: ExternalAccountType.lightning,
          icon: <PiLightning />,
          username: account.externalUsername,
          account,
        })
      }
    })
    return returnAccounts
  }

  return []
}
