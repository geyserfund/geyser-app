import { Button, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { Modal } from '../../../shared/components/layouts'

interface ProjectLaunchConfirmModalProps extends Omit<ModalProps, 'children'> {
  isLoading: boolean
  onLaunchClick: () => void
}

export const ProjectLaunchConfirmModal = ({
  isLoading,
  onLaunchClick,
  ...confirmModal
}: ProjectLaunchConfirmModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal {...confirmModal} title={t('Confirm project launch')}>
      <VStack spacing="20px">
        <Body light>
          {t(
            'By launching your project the project will be visible to and searchable by the public. You will be able to disactivate your project but not to hide your project after launching it.',
          )}
        </Body>
        <Button variant="solid" colorScheme="primary1" w="full" onClick={onLaunchClick} isLoading={isLoading}>
          {t('Confirm launch')}
        </Button>
      </VStack>
    </Modal>
  )
}
