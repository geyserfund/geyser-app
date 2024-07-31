import { Button, ButtonProps, HStack, ModalProps, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'

type AlertDialogueProps = {
  title: string
  description?: string
  hasCancel?: boolean
  neutralButtonProps?: ButtonProps
  positiveButtonProps?: ButtonProps
  negativeButtonProps?: ButtonProps
} & Omit<ModalProps, 'children'>

export const AlertDialogue = ({
  title,
  description,
  hasCancel,
  neutralButtonProps,
  positiveButtonProps,
  negativeButtonProps,
  children,
  ...props
}: PropsWithChildren<AlertDialogueProps>) => {
  const { t } = useTranslation()
  return (
    <Modal
      size="sm"
      isCentered
      {...props}
      bodyProps={{
        w: 'full',
      }}
      title={title}
    >
      <VStack width="100%" spacing={6} alignItems="start" paddingTop={4}>
        {description && <Body size="sm">{description}</Body>}

        {children}

        <HStack width="100%" justifyContent="space-between" spacing={2}>
          {hasCancel && (
            <Button flex={1} variant="soft" colorScheme={'neutral1'} onClick={props.onClose}>
              {t('Cancel')}
            </Button>
          )}
          {neutralButtonProps && (
            <Button flex={1} variant="solid" colorScheme={'neutral1'} {...neutralButtonProps}>
              {neutralButtonProps.children || t('Cancel')}
            </Button>
          )}
          {positiveButtonProps && (
            <Button flex={1} variant="solid" colorScheme={'primary1'} {...positiveButtonProps}>
              {positiveButtonProps.children || t('Confirm')}
            </Button>
          )}
          {negativeButtonProps && (
            <Button flex={1} variant="solid" colorScheme={'error'} {...negativeButtonProps}>
              {negativeButtonProps.children || t('Delete')}
            </Button>
          )}
        </HStack>
      </VStack>
    </Modal>
  )
}
