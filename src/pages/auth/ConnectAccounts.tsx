import { VStack } from '@chakra-ui/react'

import { Body1, Body2 } from '../../components/typography'
import { User } from '../../types'
import { ConnectWithLightning } from './ConnectWithLightning'
import { ConnectWithNostr } from './ConnectWithNostr'
import { ConnectWithTwitter } from './ConnectWithTwitter'

export const ConnectAccounts = ({ user }: { user: User }) => {
  const hasNostrAccount = user.externalAccounts.some(
    (externalAccount) => externalAccount?.type === 'nostr',
  )

  const displayNostrButton = !hasNostrAccount && window.nostr

  const displayTwitterButton = !user.externalAccounts.some(
    (externalAccount) => externalAccount?.type === 'twitter',
  )

  const displayLighntingButton = !user.externalAccounts.some(
    (externalAccount) => externalAccount?.type === 'lightning',
  )

  if (!displayNostrButton && !displayTwitterButton && !displayTwitterButton) {
    return null
  }

  return (
    <>
      <VStack w="full" alignItems="start">
        <Body1 bold>Connect more accounts</Body1>
        <Body2>
          Connect more social profiles to your Geyser account so you can login
          from more devices and accounts.
        </Body2>
        {displayTwitterButton && <ConnectWithTwitter />}
        {displayNostrButton && <ConnectWithNostr />}
        {displayLighntingButton && <ConnectWithLightning />}
      </VStack>
    </>
  )
}
