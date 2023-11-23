import { AddIcon } from '@chakra-ui/icons'
import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../components/layouts/Modal'
import { Body2 } from '../../components/typography'
import { useModal } from '../../hooks/useModal'
import { User } from '../../types'
import {
  hasFacebookAccount,
  hasGithubAccount,
  hasGoogleAccount,
  hasLightningAccount,
  hasNostrAccount,
  hasTwitterAccount,
  useMobileMode,
} from '../../utils'
import { ConnectWithLightning } from './ConnectWithLightning'
import { ConnectWithNostr } from './ConnectWithNostr'
import { ConnectWithSocial } from './ConnectWithSocial'
import { SocialAccountType } from './type'

export const ConnectAccounts = ({ user }: { user: User }) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { isOpen, onOpen, onClose } = useModal()

  const displayNostrButton = !hasNostrAccount(user) && !isMobile

  const displayTwitterButton = !hasTwitterAccount(user)

  const displayLightningButton = !hasLightningAccount(user)

  const displayFacebookButton = !hasFacebookAccount(user)

  const displayGoogleButton = !hasGoogleAccount(user)

  const displayGithubButton = !hasGithubAccount(user)

  const canConnectAccount =
    displayTwitterButton ||
    displayNostrButton ||
    displayLightningButton ||
    displayFacebookButton ||
    displayGoogleButton ||
    displayGithubButton

  if (!canConnectAccount) {
    return null
  }

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
          {}
          {displayGoogleButton && (
            <ConnectWithSocial accountType={SocialAccountType.google} />
          )}
          {displayGithubButton && (
            <ConnectWithSocial accountType={SocialAccountType.github} />
          )}
          {displayFacebookButton && (
            <ConnectWithSocial accountType={SocialAccountType.facebook} />
          )}
          {displayTwitterButton && (
            <ConnectWithSocial accountType={SocialAccountType.twitter} />
          )}
          {displayNostrButton && <ConnectWithNostr />}
          {displayLightningButton && <ConnectWithLightning />}
        </VStack>
      </Modal>
    </>
  )
}
