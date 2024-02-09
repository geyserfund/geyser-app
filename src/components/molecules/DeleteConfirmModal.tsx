import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ButtonComponent } from '../ui'

interface IDeleteConfirmModal {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  confirm: () => any
  isLoading?: boolean
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  title,
  description,
  confirm,
  isLoading,
}: IDeleteConfirmModal) => {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="0 20px 20px 20px">
        <ModalHeader>
          <Text fontSize="16px" fontWeight={600}>
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack width="100%" spacing="30px">
            <Text wordBreak="break-word">{description}</Text>
            <HStack width="100%" justifyContent="space-between" spacing="20px">
              <ButtonComponent onClick={onClose}>{t('Cancel')}</ButtonComponent>
              <ButtonComponent backgroundColor="red.500" onClick={confirm} isLoading={isLoading}>
                {t('Confirm')}
              </ButtonComponent>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
