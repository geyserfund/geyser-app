import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ControlledTextInput } from '@/shared/components/controlledInput'
import { ControlledCheckboxInput } from '@/shared/components/controlledInput/ControlledCheckboxInput'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'

import { EmailPromptModalUrl } from '../../../shared/constants'
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
              <Body size="sm" medium>
                {t('Receive email notifications for projects you follow')}
              </Body>
              <Body size="sm" light>
                {t(
                  'Stay up to date with projects you follow by receiving recurring project updates and Geyser product announcements. Drop email below, and unsubscribe anytime.',
                )}
              </Body>
            </VStack>
            <VStack w="100%" gap={0}>
              <ControlledTextInput control={control} name="email" label="" placeholder="satoshi@gmx.com" />
              <ControlledCheckboxInput control={control} name="dontAskAgain" label={t("Don't ask again")} />
            </VStack>
            <Button w="100%" variant="solid" colorScheme="primary1" type="submit" isDisabled={!enableSave}>
              {t('Save')}
            </Button>
          </VStack>
        </form>
      </Modal>
    </>
  )
}
