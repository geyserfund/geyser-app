import { VStack } from '@chakra-ui/react'

import { Body2 } from '../../components/typography'
import { User } from '../../types'
import { ConnectWithLightning } from './ConnectWithLightning'
import { ConnectWithNostr } from './ConnectWithNostr'
import { ConnectWithTwitter } from './ConnectWithTwitter'
import { ExternalAccountType } from './type'

export const ConnectAccounts = ({ user }: { user: User }) => {
  const hasNostrAccount = user.externalAccounts.some(
    (externalAccount) => externalAccount?.type === 'nostr',
  )

  const displayNostrButton = !hasNostrAccount && window.nostr

  const displayTwitterButton = !user.externalAccounts.some(
    (externalAccount) => externalAccount?.type === ExternalAccountType.twitter,
  )

  const displayLightningButton = !user.externalAccounts.some(
    (externalAccount) =>
      externalAccount?.type === ExternalAccountType.lightning,
  )

  if (!displayNostrButton && !displayTwitterButton && !displayLightningButton) {
    return null
  }

  return (
    <>
      <VStack w="full" alignItems="start">
        <Body2 color="neutral.900">
          Connect more social profiles to your Geyser account.
        </Body2>
        {displayTwitterButton && <ConnectWithTwitter />}
        {displayNostrButton && <ConnectWithNostr />}
        {displayLightningButton && <ConnectWithLightning />}
      </VStack>
    </>
  )
}
