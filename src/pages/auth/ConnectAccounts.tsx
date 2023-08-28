import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../components/typography'
import { User } from '../../types'
import {
  hasLightningAccount,
  hasNostrAccount,
  hasTwitterAccount,
  useMobileMode,
} from '../../utils'
import { ConnectWithLightning } from './ConnectWithLightning'
import { ConnectWithNostr } from './ConnectWithNostr'
import { ConnectWithTwitter } from './ConnectWithTwitter'

export const ConnectAccounts = ({ user }: { user: User }) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const displayNostrButton = !hasNostrAccount(user) && !isMobile

  const displayTwitterButton = !hasTwitterAccount(user)

  const displayLightningButton = !hasLightningAccount(user)

  if (!displayNostrButton && !displayTwitterButton && !displayLightningButton) {
    return null
  }

  return (
    <>
      <VStack w="full" alignItems="start">
        <Body2 color="neutral.900">
          {t('Connect more social profiles to your Geyser account.')}
        </Body2>
        {displayTwitterButton && <ConnectWithTwitter />}
        {displayNostrButton && <ConnectWithNostr />}
        {displayLightningButton && <ConnectWithLightning />}
      </VStack>
    </>
  )
}
