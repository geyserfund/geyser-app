import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'

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
        <Body1>
          {t(
            'The project will be saved as a Draft and you can access it in your Profile page.',
          )}
        </Body1>

        <Button w="full" variant="primary" onClick={onConfirm}>
          {t('Save as draft')}
        </Button>
      </VStack>
    </Modal>
  )
}
