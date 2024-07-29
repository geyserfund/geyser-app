import { Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body, H3 } from '@/shared/components/typography'

import { Modal } from '../../../../../shared/components/layouts/Modal'
import { useUnsavedAlert } from '../../../../../shared/hooks'
import { useModal, UseModalReturn } from '../../../../../shared/hooks/useModal'

interface Props extends Omit<UseModalReturn<{ onLeave(): void }>, 'children'> {
  hasUnsaved: boolean
}

const ARE_YOU_SURE = `If you quit from this view your information will be unsaved. You may
                      want to save your work as a draft before leaving this view`

export type UseProjectUnsavedModalProps = Pick<Props, 'hasUnsaved'>

export const useProjectUnsavedModal = ({
  hasUnsaved,
}: UseProjectUnsavedModalProps): UseProjectUnsavedModalProps & UseModalReturn<{ onLeave(): void }> => {
  const modal = useModal<{ onLeave(): void }>()

  return { ...modal, hasUnsaved }
}

export const ProjectUnsavedModal = ({ hasUnsaved, ...modalProps }: Props) => {
  const { t } = useTranslation()
  useUnsavedAlert(hasUnsaved)

  return (
    <Modal {...modalProps} title={<H3 size="xl">Leave project creation</H3>} isOpen={modalProps.isOpen && hasUnsaved}>
      <VStack w="100%" spacing={6} pt={1}>
        <Body size="sm">{t(ARE_YOU_SURE)}</Body>
        <Button w="100%" variant="outline" colorScheme="error" onClick={modalProps.props.onLeave || undefined}>
          {t('Leave without saving')}
        </Button>
      </VStack>
    </Modal>
  )
}
