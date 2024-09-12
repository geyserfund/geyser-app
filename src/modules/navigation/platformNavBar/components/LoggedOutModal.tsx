import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UseModalProps,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthModal } from '../../../../pages/auth/hooks'

export const LoggedOutModal = ({ isOpen, onClose }: UseModalProps) => {
  const { t } = useTranslation()
  const { loginOnOpen } = useAuthModal()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader>
          <Text fontSize="16px" fontWeight="normal">
            {t('You have been logged out')}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{t('Please log back in with your profile, or press continue if want to stay anonymous.')}</Text>
          <Box display="flex" justifyContent="space-between" paddingTop="20px">
            <Button variant="solid" colorScheme="primary1" width="50%" mx={1} onClick={() => loginOnOpen()}>
              {t('Login')}
            </Button>
            <Button variant="soft" colorScheme="neutral1" width="50%" mx={1} onClick={onClose}>
              {t('Continue')}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
