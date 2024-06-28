import { Link } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'
import { PiGithubLogo, PiXLogo } from 'react-icons/pi'

import { ExternalAccountType } from '../../../../../../../../../pages/auth'
import { NostrIcon } from '../../../../../../../../../shared/components/icons'
import { ExternalAccount } from '../../../../../../../../../types'

interface GetExternalAccountsProps {
  accounts?: ExternalAccount[]
}

export const getExternalAccountsButtons = ({ accounts }: GetExternalAccountsProps) => {
  if (accounts) {
    return accounts.map((account) => {
      const isTwitter = account.accountType === ExternalAccountType.twitter
      if (isTwitter) {
        return {
          key: 'twitter',
          icon: <PiXLogo />,
          username: account.externalUsername,
          props: {
            as: Link,
            isExternal: true,
            href: `https://twitter.com/${account.externalUsername}`,
          },
        }
      }

      const isNostr = account.accountType === ExternalAccountType.nostr
      if (isNostr) {
        const npub = nip19.npubEncode(account.externalId)
        return {
          key: 'nostr',
          icon: <NostrIcon height="12px" width="12px" />,
          username: npub,
          props: {
            as: Link,
            isExternal: true,
            href: `https://primal.net/p/${npub}`,
          },
        }
      }

      const isGithub = account.accountType === ExternalAccountType.github
      if (isGithub) {
        return {
          key: 'facebook',
          icon: <PiGithubLogo />,
          username: account.externalUsername,
          props: {
            as: Link,
            isExternal: true,
            href: `https://twitter.com/${account.externalUsername}`,
          },
        }
      }

      return {}
    })
  }

  return []
}
