import { VStack } from '@chakra-ui/react'

import { Body2 } from '../../components/typography'
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

  if (!displayNostrButton && !displayTwitterButton && !displayLighntingButton) {
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
        {displayLighntingButton && <ConnectWithLightning />}
      </VStack>
    </>
  )
}
