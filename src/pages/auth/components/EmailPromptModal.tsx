import { Box, Button, Checkbox, Text, UseModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ControlledTextInput } from '../../../components/inputs'
import { Modal } from '../../../components/layouts'
import { useEmailPrompt } from '../hooks/useEmailPrompt'

export const EmailPromptModal = ({ onEmailUpdated, ...modalProps }: UseModalProps & { onEmailUpdated: () => void }) => {
  const { t } = useTranslation()

  const { control, handleSubmit, onSubmit } = useEmailPrompt()

  return (
    <Modal {...modalProps} title={t('Email')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack display="flex" justifyContent="flex-start" alignItems="flex-start" w="100%" gap={4}>
          <Box w="100%" display="flex" justifyContent="center" alignItems="center">
            <Text>{t('Email illustration')}</Text>
          </Box>
          <Text>
            {t(
              'Stay up to date with projects you follow by receiving recurring project updates. Drop email below, and unsubscribe at any time.',
            )}
          </Text>
          <ControlledTextInput control={control} name="email" label={t('Email')} placeholder="satoshi@gmx.com" />
          <Checkbox name="dontAskAgain">{t("Don't ask again")}</Checkbox>
          <Button w="100%" variant="primary" type="submit">
            {t('Save')}
          </Button>
        </VStack>
      </form>
    </Modal>
  )
}
