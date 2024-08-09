import { useTranslation } from 'react-i18next'

import { AlertDialogue } from './AlertDialogue'

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
    <AlertDialogue
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      isCentered
      title={title}
      description={description}
      negativeButtonProps={{
        onClick: confirm,
        children: t('Confirm'),
        isLoading,
      }}
      hasCancel
    />
  )
}
