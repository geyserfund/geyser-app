import { Stack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H3 } from '@/shared/components/typography'

import { CustomModalProps, Modal } from '../../shared/components/layouts'
import { MfaAction } from '../../types'
import { VerifyYourEmailContent, VerifyYourEmailContentProps } from './VerifyYourEmailContent'

interface VerifyYourEmailProps
  extends Omit<VerifyYourEmailContentProps, 'onClose'>,
    Omit<CustomModalProps, 'children'> {
  title?: string
}

export const VerifyYourEmail = ({
  title,
  action,
  initEmail,
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

  if (!rest.isOpen) {
    return null
  }

  const selectedTitle = title || t('Verify your email')

  return (
    <VStack w="100%" h="100%" justifyContent="center" alignItems="center">
      <Modal
        title={
          <H3 size="lg" bold>
            {selectedTitle}
          </H3>
        }
        size="lg"
        {...rest}
      >
        <Stack w="100%" padding="10px" spacing="20px" maxWidth="500px">
          <VerifyYourEmailContent
            onClose={rest.onClose}
            initEmail={initEmail}
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
