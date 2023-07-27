import { Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CustomModalProps, Modal } from '../../components/layouts'
import { MfaAction } from '../../types'
import {
  VerifyYourEmailContent,
  VerifyYourEmailContentProps,
} from './VerifyYourEmailContent'

interface VerifyYourEmailProps
  extends VerifyYourEmailContentProps,
    Omit<CustomModalProps, 'children'> {}

export const VerifyYourEmail = ({
  action,
  handleVerify,
  otpSent,
  otpData,
  ...rest
}: VerifyYourEmailProps) => {
  const { t } = useTranslation()

  const getAction = () => {
    if (action) {
      return action
    }

    return MfaAction.UserEmailVerification
  }

  return (
    <VStack w="100%" h="100%" justifyContent="center" alignItems="center">
      <Modal
        title={<Text variant="h3">{t('Verify your email')}</Text>}
        size="lg"
        {...rest}
      >
        <Stack w="100%" padding="10px" spacing="20px" maxWidth="500px">
          <VerifyYourEmailContent
            action={getAction()}
            handleVerify={handleVerify}
            otpSent={otpSent}
            otpData={otpData}
          />
        </Stack>
      </Modal>
    </VStack>
  )
}
