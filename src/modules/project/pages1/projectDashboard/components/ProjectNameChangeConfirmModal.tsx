import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { Modal } from '../../../../../shared/components/layouts'

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
        <Body>
          {t("You've changed your project identifier which also changes your Geyser URL and Lightning address.")}
        </Body>
        <Body>{t('Are you sure you want to save these changes?')}</Body>
        <VStack w="full" spacing="10px">
          <Button w="full" variant="soft" colorScheme="neutral1" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button w="full" variant="solid" colorScheme="primary1" onClick={handleSave}>
            {t('Save Changes')}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  )
}
