import { Box, Button, Image, Text, UseModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ControlledTextInput } from '../../../components/inputs'
import { ControlledCheckboxInput } from '../../../components/inputs/ControlledCheckboxInput'
import { Modal } from '../../../components/layouts'
import { EmailPromptModalUrl } from '../../../constants'
import { useEmailPrompt } from '../hooks/useEmailPrompt'

export const EmailPromptModal = ({ onEmailUpdated, ...modalProps }: UseModalProps & { onEmailUpdated: () => void }) => {
  const { t } = useTranslation()

  const { control, handleSubmit, onSubmit, enableSave } = useEmailPrompt()

  const handleEmailPrompSubmit = (data: any) => {
    onSubmit(data)

    if (data.email) {
      onEmailUpdated()
    }

    modalProps.onClose()
  }

  return (
    <>
      <Modal {...modalProps} title={t('Email')} size="lg">
        <form onSubmit={handleSubmit(handleEmailPrompSubmit)}>
          <VStack display="flex" justifyContent="flex-start" alignItems="flex-start" w="100%" gap={4}>
            <Box w="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
              <Image height="100%" src={EmailPromptModalUrl} alt="Email illustration" objectFit="contain" />
            </Box>
            <VStack display="flex" justifyContent="flex-start" alignItems="flex-start" w="100%" gap={1}>
              <Text fontSize="14px" color="neutral.700" fontWeight="medium">
                {t('Receive email notifications for projects you follow')}
              </Text>
              <Text fontSize="14px" color="neutral.600">
                {t(
                  'Stay up to date with projects you follow by receiving recurring project updates. Drop email below, and unsubscribe at any time.',
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
