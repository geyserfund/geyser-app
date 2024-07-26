import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { Modal } from '../../../../../shared/components/layouts'

export const ProjectExitConfirmModal = ({
  onConfirm,
  ...rest
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  const { t } = useTranslation()
  return (
    <Modal {...rest} title={t('Exit the creation flow')}>
      <VStack w="full" spacing="40px">
        <Body>{t('The project will be saved as a Draft and you can access it in your Profile page.')}</Body>

        <Button w="full" variant="solid" colorScheme="primary1" onClick={onConfirm}>
          {t('Save as draft')}
        </Button>
      </VStack>
    </Modal>
  )
}
