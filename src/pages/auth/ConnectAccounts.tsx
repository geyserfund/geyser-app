import { VStack } from '@chakra-ui/react'

import { Body1, Body2 } from '../../components/typography'
import { User } from '../../types'
import { ConnectWithLightning } from './ConnectWithLightning'
import { ConnectWithNostr } from './ConnectWithNostr'
import { ConnectWithTwitter } from './ConnectWithTwitter'

export const ConnectAccounts = ({ user }: { user: User }) => {
  // const displayNostrButton = !user.externalAccounts.some(
  //   (externalAccount) => externalAccount?.type === 'nostr',
  // )

  // const displayTwitterButton = !user.externalAccounts.some(
  //   (externalAccount) => externalAccount?.type === 'twitter',
  // )

  const displayNostrButton = true

  const displayTwitterButton = true

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
        <ConnectWithLightning />
      </VStack>
    </>
  )
}
