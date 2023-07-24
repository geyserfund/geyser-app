import { Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CustomModalProps, Modal } from '../../components/layouts'
import { MfaAction, OtpResponseFragment } from '../../types'
import { VerifyYourEmailContent } from './VerifyYourEmailContent'

interface VerifyYourEmailProps extends Omit<CustomModalProps, 'children'> {
  action?: MfaAction
  handleVerify?: (otpCode: number, optData: OtpResponseFragment) => void
}

export const VerifyYourEmail = ({
  action,
  handleVerify,
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
          />
        </Stack>
      </Modal>
    </VStack>
  )
}
