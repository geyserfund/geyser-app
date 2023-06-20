import { Link, useTheme } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'
import { useMemo, useState } from 'react'
import { BsTwitter } from 'react-icons/bs'

import { NostrSvgIcon } from '../components/icons'
import { ExternalAccountType } from '../pages/auth'
import { ExternalAccount } from '../types'
import { copyTextToClipboard } from '../utils'

interface UseExternalAccountsProps {
  accounts?: ExternalAccount[]
}

export const useExternalAccountsButtons = ({
  accounts,
}: UseExternalAccountsProps) => {
  const theme = useTheme()

  const [copy, setCopy] = useState(false)

  const handleCopyPubkey = (npub: string) => {
    copyTextToClipboard(npub)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  return useMemo(() => {
    if (accounts) {
      return accounts.map((account) => {
        const isTwitter = account.accountType === ExternalAccountType.twitter
        if (isTwitter) {
          return {
            key: 'twitter',
            icon: <BsTwitter />,
            username: account.externalUsername,
            color: theme.colors.social.twitter,
            props: {
              as: Link,
              target: '_blank',
              href: `https://twitter.com/${account.externalUsername}`,
            },
          }
        }

        const isNostr = account.accountType === ExternalAccountType.nostr
        if (isNostr) {
          const npub = nip19.npubEncode(account.externalId)
          return {
            key: 'nostr',
            icon: <NostrSvgIcon />,
            username: npub,
            color: copy ? theme.colors.primary[500] : theme.colors.social.nostr,
            props: {
              textDecoration: 'underline',
              cursor: 'pointer',
              onClick: () => handleCopyPubkey(npub),
            },
          }
        }

        return {}
      })
    }

    return []
  }, [accounts, copy, theme])
}
