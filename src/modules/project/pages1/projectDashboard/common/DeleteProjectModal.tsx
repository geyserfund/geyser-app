import { Alert, AlertIcon, Button, Checkbox, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { Modal } from '../../../../../shared/components/layouts/Modal'
import { UseModalReturn } from '../../../../../shared/hooks/useModal'

export const DeleteProjectModal = ({
  onConfirm,
  isLoading,
  ...props
}: UseModalReturn & { onConfirm(): void; isLoading: boolean }) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(false)

  return (
    <Modal title={t('Delete Project')} {...props}>
      <VStack spacing={4}>
        <Body size="sm" light>
          {t(
            'By deleting this project you will loose all data associated to this project including descriptions, photos, entries, and rewards.',
          )}
        </Body>
        <Alert>
          <AlertIcon />
          <Body size="sm">
            {t(
              'This action is irreversible. You will not be able to view or access this project or project data any longer.',
            )}
          </Body>
        </Alert>
        <Checkbox w="100%" checked={checked} onChange={() => setChecked((current) => !current)}>
          <Body size="sm">{t('Confirm that you want to delete the project')}</Body>
        </Checkbox>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading || !checked}
          w="100%"
          variant="solid"
          colorScheme="error"
          onClick={() => onConfirm()}
        >
          {t('Confirm')}
        </Button>
      </VStack>
    </Modal>
  )
}
