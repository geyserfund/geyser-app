import { VStack, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AddIcon } from '@chakra-ui/icons'

import { Body2 } from '../../components/typography'
import { Modal } from '../../components/layouts/Modal'
import { useModal } from '../../hooks/useModal'
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
  const { isOpen, onOpen, onClose } = useModal()

  const displayNostrButton = !hasNostrAccount(user) && !isMobile

  const displayTwitterButton = !hasTwitterAccount(user)

  const displayLightningButton = !hasLightningAccount(user)

  if (!displayNostrButton && !displayTwitterButton && !displayLightningButton) {
    return null
  }
  const canConnectAccount =
    displayTwitterButton || displayNostrButton || displayLightningButton

  return (
    <>
      {canConnectAccount && (
        <Button
          onClick={onOpen}
          width="100%"
          variant="secondary"
          size="sm"
          leftIcon={<AddIcon />}
        >
          {t('Connect your accounts')}
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('Connect more accounts')}
      >
        <VStack w="full" alignItems="start">
          <Body2 color="neutral.600" mb={4}>
            {t('Connect more social profiles to your Geyser account.')}
          </Body2>
          {displayTwitterButton && <ConnectWithTwitter />}
          {displayNostrButton && <ConnectWithNostr />}
          {displayLightningButton && <ConnectWithLightning />}
        </VStack>
      </Modal>
    </>
  )
}
