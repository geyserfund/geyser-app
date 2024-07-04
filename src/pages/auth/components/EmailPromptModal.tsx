import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ControlledTextInput } from '../../../components/inputs'
import { ControlledCheckboxInput } from '../../../components/inputs/ControlledCheckboxInput'
import { Modal } from '../../../components/layouts'
import { EmailPromptModalUrl } from '../../../constants'
import { useEmailPrompt } from '../hooks/useEmailPrompt'

type EmailPromptModalProps = {
  onCloseAction?: () => void
  onClose: () => void
  isOpen: boolean
}

export const EmailPromptModal = ({ onCloseAction, onClose, isOpen }: EmailPromptModalProps) => {
  const { t } = useTranslation()

  const { control, handleSubmit, onSubmit, enableSave, reset, shouldPrompt } = useEmailPrompt()

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handleEmailPrompSubmit = (data: any) => {
    onSubmit(data)
    onCloseAction?.()
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen && shouldPrompt} onClose={onClose} title={t('Email')} size="lg">
        <form onSubmit={handleSubmit(handleEmailPrompSubmit)}>
          <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={4}>
            <Box w="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
              <Image height="100%" src={EmailPromptModalUrl} alt="Email illustration" objectFit="contain" />
            </Box>
            <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={1}>
              <Text fontSize="14px" color="neutral.700" fontWeight="medium">
                {t('Receive email notifications for projects you follow')}
              </Text>
              <Text fontSize="14px" color="neutral.600">
                {t(
                  'Stay up to date with projects you follow by receiving recurring project updates and Geyser product announcements. Drop email below, and unsubscribe anytime.',
                )}
              </Text>
            </VStack>
            <VStack w="100%" gap={0}>
              <ControlledTextInput control={control} name="email" label="" placeholder="satoshi@gmx.com" />
              <ControlledCheckboxInput control={control} name="dontAskAgain" label={t("Don't ask again")} />
            </VStack>
            <Button w="100%" variant="primary" type="submit" isDisabled={!enableSave}>
              {t('Save')}
            </Button>
          </VStack>
        </form>
      </Modal>
    </>
  )
}
