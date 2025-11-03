import { Alert, AlertIcon, Text } from '@chakra-ui/react'

import { AlertDialogue } from '@/shared/molecules/AlertDialogue'

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
  return (
    <>
      <AlertDialogue
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        description={description}
        hasCancel
        positiveButtonProps={{
          onClick: confirm,
          isLoading,
        }}
      >
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
      </AlertDialogue>
    </>
  )
}
