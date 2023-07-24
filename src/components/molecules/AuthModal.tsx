import { Box, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import { useAuthContext } from '../../context'
import { ConnectWithEmail } from '../../pages/auth/ConnectWithEmail'
import { ConnectWithLightning } from '../../pages/auth/ConnectWithLightning'
import { ConnectWithNostr } from '../../pages/auth/ConnectWithNostr'
import { ConnectWithTwitter } from '../../pages/auth/ConnectWithTwitter'
import { hasNostrAccount, hasTwitterAccount } from '../../utils'
import { Caption } from '../typography'
import { ButtonComponent } from '../ui'

interface IAuthModal {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  showTwitter?: boolean
  showNostr?: boolean
  showLightning?: boolean
  privateRoute?: boolean
}

const ConnectAccounts = ({
  onClose,
  showTwitter,
  showNostr,
  showLightning,
}: any) => {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  return (
    <VStack justifyContent="center" alignItems="center">
      <Text color="neutral.6002" fontSize="12px" marginBottom={5}>
        {t(
          'Connecting with Twitter or Lightning allows you to keep track of your favorite projects and to launch your own projects.',
        )}
      </Text>
      <Stack width="100%">
        {!hasTwitterAccount(user) && showTwitter && (
          <ConnectWithTwitter onClose={onClose} />
        )}
        {!hasNostrAccount(user) && showNostr && (
          <ConnectWithNostr onClose={onClose} />
        )}
        {showLightning && <ConnectWithLightning onClose={onClose} />}
        <ConnectWithEmail onClose={onClose} />
      </Stack>
      <Caption paddingTop="5px">
        {t(
          "If you're having trouble connecting with Twitter on Mobile, first try logging in on Twitter.com on your browser, then try again.",
        )}
      </Caption>
    </VStack>
  )
}

export const AuthModal = (authModalProps: IAuthModal) => {
  const { t } = useTranslation()
  const {
    isOpen,
    onClose,
    title,
    description,
    showTwitter = true,
    showNostr = true,
    showLightning = true,
    privateRoute = false,
  } = authModalProps

  const navigate = useNavigate()
  const location = useLocation()

  const handlePrivateRouteModalClose = () => {
    if (privateRoute) {
      if (location.key) {
        navigate(-1)
      } else {
        navigate('/')
      }
    }
  }

  const modalTitle = title || t('Connect')
  const modalDescription = description || t('Connect to launch')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!privateRoute}
      closeOnEsc={!privateRoute}
      onOverlayClick={handlePrivateRouteModalClose}
      onEsc={handlePrivateRouteModalClose}
    >
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            {modalTitle}
          </Text>
        </ModalHeader>
        {privateRoute || <ModalCloseButton />}
        <ModalBody width="100%">
          <Box
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            marginLeft={2}
            marginRight={2}
          >
            {modalDescription && (
              <Text marginBottom={5}>{modalDescription}</Text>
            )}
            <ConnectAccounts
              onClose={onClose}
              showNostr={showNostr}
              showTwitter={showTwitter}
              showLightning={showLightning}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={5}
          >
            {privateRoute && (
              <ButtonComponent onClick={handlePrivateRouteModalClose}>
                {t(location.key ? 'Go back' : 'Go home')}
              </ButtonComponent>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
