import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../../../../components/layouts'
import { Body1 } from '../../../../../components/typography'

export const ProjectNameChangeConfirmModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}) => {
  const { t } = useTranslation()

  const handleSave = () => {
    onSave()
    onClose()
  }

  return (
    <Modal title={t('Are you sure?')} isOpen={isOpen} onClose={onClose}>
      <VStack w="full" spacing="20px">
        <Body1>
          {t("You've changed your project identifier which also changes your Geyser URL and Lightning address.")}
        </Body1>
        <Body1>{t('Are you sure you want to save these changes?')}</Body1>
        <VStack w="full" spacing="10px">
          <Button w="full" variant="primaryNeutral" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button w="full" variant="primary" onClick={handleSave}>
            {t('Save Changes')}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  )
}
