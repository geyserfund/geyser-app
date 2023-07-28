import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { TextInputBox } from '../../../components/ui'

interface DeleteTextConfirmProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  textToConfirm: string
  confirm?: () => any
  close?: () => any
  isLoading?: boolean
}

export const DeleteTextConfirm = ({
  isOpen,
  onClose,
  title,
  description,
  confirm,
  textToConfirm,
  close,
  isLoading,
}: DeleteTextConfirmProps) => {
  const { t } = useTranslation()

  const [confirmText, setConfirmText] = useState('')

  const textValid = confirmText === textToConfirm

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 20px">
        <ModalHeader>
          <Text fontSize="16px" fontWeight={600}>
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack width="100%" spacing="30px" alignItems="start">
            <Box>
              <Text wordBreak="break-word">{description}</Text>
              {textToConfirm && (
                <Text wordBreak="break-word">
                  <Trans
                    i18nKey={"Type '{{textToConfirm}}' and confirm"}
                    values={{ textToConfirm }}
                  >
                    {"Type '{{textToConfirm}}' and confirm"}
                  </Trans>
                  {description}
                </Text>
              )}
            </Box>

            {textToConfirm && (
              <TextInputBox
                value={confirmText}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setConfirmText(event.target.value)
                }
                error={!textValid}
              />
            )}
            {confirm && (
              <Button
                w="full"
                variant="danger"
                onClick={confirm}
                isLoading={isLoading}
                isDisabled={!textValid}
              >
                {t('Confirm')}
              </Button>
            )}
            {close && (
              <Button
                w="full"
                variant="primary"
                onClick={close}
                isLoading={isLoading}
              >
                {t('Close')}
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
