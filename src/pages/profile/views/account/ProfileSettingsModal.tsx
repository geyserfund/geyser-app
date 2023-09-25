import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { EditProfileModalProps } from '../../hooks/useEditProfileModal'
import { UpdateVerifyEmail } from './components'
import { DeleteUserProfile } from './components/DeleteUserProfile'
import { ShowContributionSummary } from './components/ShowContributionSummary'

export const ProfileSettingsModal = ({
  isOpen,
  onClose,
  props,
}: EditProfileModalProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={0}>
          <Box borderRadius="4px" bg="neutral.0" pb={3}>
            <ModalHeader pb={2}>{t('Settings')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing="20px">
                <UpdateVerifyEmail />
                <DeleteUserProfile />
                <ShowContributionSummary />
              </VStack>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
