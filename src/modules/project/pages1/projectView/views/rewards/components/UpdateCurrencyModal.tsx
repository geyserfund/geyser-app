import {
  Alert,
  AlertIcon,
  Button,
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

interface IUpdateCurrencyModal {
  isOpen: boolean
  onClose: () => void
  title: string
  confirm: () => any
  isLoading?: boolean
  warning?: string
  description?: string
}

export const UpdateCurrencyModal = ({
  isOpen,
  onClose,
  title,
  confirm,
  isLoading,
  warning,
  description,
}: IUpdateCurrencyModal) => {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent display="flex" padding="0 20px 20px 20px">
        <ModalHeader>
          <Text fontSize="16px" fontWeight={600}>
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <VStack width="100%" spacing="15px">
            {warning && (
              <Alert
                status="warning"
                backgroundColor={'primary.50'}
                borderColor={'primary.400'}
                borderStyle={'solid'}
                borderWidth={2}
                borderRadius={'8px'}
              >
                <AlertIcon color={'neutral.900'} />
                <Text fontSize="14px" fontWeight={400}>
                  {warning}
                </Text>
              </Alert>
            )}
            {description && (
              <Text fontSize="14px" fontWeight={400}>
                {description}
              </Text>
            )}
            <Button variant="secondary" w="full" onClick={onClose} isLoading={isLoading}>
              {t('Cancel')}
            </Button>
            <Button isLoading={isLoading} onClick={confirm} variant="primary" w="full" type="submit">
              {t('Save')}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
