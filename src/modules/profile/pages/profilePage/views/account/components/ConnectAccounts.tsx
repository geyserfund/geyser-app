import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { ConnectWithLightning } from '../../../../../../../modules/auth/ConnectWithLightning'
import { ConnectWithNostr } from '../../../../../../../modules/auth/ConnectWithNostr'
import { ConnectWithSocial } from '../../../../../../../modules/auth/ConnectWithSocial'
import { SocialAccountType } from '../../../../../../../modules/auth/type'
import { useAuthToken } from '../../../../../../../modules/auth/useAuthToken'
import { Modal } from '../../../../../../../shared/components/layouts/Modal'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import { UserForProfilePageFragment } from '../../../../../../../types'
import {
  hasFacebookAccount,
  hasGithubAccount,
  hasGoogleAccount,
  hasLightningAccount,
  hasNostrAccount,
  hasTwitterAccount,
  useMobileMode,
} from '../../../../../../../utils'
import { useViewingOwnProfileAtomValue } from '../../../../../state'

export const ConnectAccounts = ({ user }: { user: UserForProfilePageFragment }) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { isOpen, onOpen, onClose } = useModal()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  useAuthToken(isOpen)

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

  if (!canConnectAccount || !isViewingOwnProfile) {
    return null
  }

  return (
    <>
      {canConnectAccount && (
        <Button size="sm" onClick={onOpen} variant="surface" colorScheme="neutral1">
          <PiPlus />
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} title={t('Connect more accounts')}>
        <VStack w="full" alignItems="center" spacing={4}>
          <Body light>{t('Connect more social profiles to your Geyser account.')}</Body>
          <VStack>
            {displayTwitterButton && <ConnectWithSocial accountType={SocialAccountType.twitter} w="full" />}
            {displayNostrButton && <ConnectWithNostr w="full" />}
            {displayFacebookButton && <ConnectWithSocial accountType={SocialAccountType.facebook} w="full" />}
            {displayGoogleButton && <ConnectWithSocial accountType={SocialAccountType.google} w="full" />}

            {displayLightningButton && <ConnectWithLightning w="full" />}

            {displayGithubButton && <ConnectWithSocial accountType={SocialAccountType.github} w="full" />}
          </VStack>
        </VStack>
      </Modal>
    </>
  )
}
