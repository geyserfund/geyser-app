import { Button, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../components/typography'
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
        <Body1 color="neutral.700">
          {t(
            'By launching your project the project will be visible to and searchable by the public. You will be able to disactivate your project but not to hide your project after launching it.',
          )}
        </Body1>
        <Button variant="primary" w="full" onClick={onLaunchClick} isLoading={isLoading}>
          {t('Confirm launch')}
        </Button>
      </VStack>
    </Modal>
  )
}
