import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { TiPlus } from 'react-icons/ti'

import { Modal } from '../../../../../../../components/layouts/Modal'
import { Body2 } from '../../../../../../../components/typography'
import { useModal } from '../../../../../../../hooks/useModal'
import { ConnectWithLightning } from '../../../../../../../pages/auth/ConnectWithLightning'
import { ConnectWithNostr } from '../../../../../../../pages/auth/ConnectWithNostr'
import { ConnectWithSocial } from '../../../../../../../pages/auth/ConnectWithSocial'
import { SocialAccountType } from '../../../../../../../pages/auth/type'
import { useRefreshAuthToken } from '../../../../../../../pages/auth/useAuthToken'
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

  useRefreshAuthToken(isOpen)

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
        <Button size="sm" onClick={onOpen} width="100%" variant="secondary" leftIcon={<TiPlus />}>
          {t('Connect more accounts')}
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} title={t('Connect more accounts')}>
        <VStack w="full" alignItems="center">
          <Body2 color="neutral.600" mb={4}>
            {t('Connect more social profiles to your Geyser account.')}
          </Body2>
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
