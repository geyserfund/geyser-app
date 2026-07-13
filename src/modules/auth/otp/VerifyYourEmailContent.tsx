import { t } from 'i18next'
import { useEffect, useState } from 'react'

import Loader from '@/components/ui/Loader'
import { useAuthContext } from '@/context'
import { MfaAction, OtpResponseFragment, useSendOtpByEmailMutation } from '@/types'
import { useNotification } from '@/utils'

import { getAuthFailureMessage } from '../authFailure'
import { AuthFlowIntent } from '../type'
import { ReceiveOneTimePassword } from './components/ReceiveOneTimePassword'
import { VerifyOneTimePassword } from './components/VerifyOneTimePassword'

export interface VerifyYourEmailContentProps {
  action: MfaAction
  otpSent?: boolean
  otpData?: OtpResponseFragment
  initEmail?: string
  handleVerify?: (otpCode: number, otpData: OtpResponseFragment, email?: string) => void
  onClose?: () => void
  authFlowIntent?: AuthFlowIntent
}

export const VerifyYourEmailContent = ({
  initEmail,
  action,
  handleVerify,
  otpSent,
  otpData: otp,
  onClose,
  authFlowIntent,
}: VerifyYourEmailContentProps) => {
  const { toast } = useNotification()
  const { user } = useAuthContext()

  const [sentOtp, setSentOtp] = useState(otpSent || false)
  const [otpData, setOtpData] = useState<OtpResponseFragment | undefined>(otp)
  const [inputEmail, setInputEmail] = useState('')

  const [sendOtpByEmail, { loading }] = useSendOtpByEmailMutation({
    onError(error) {
      toast({
        status: 'error',
        title: t('Failed to generate OTP.'),
        description: getAuthFailureMessage(t, error.graphQLErrors?.[0]?.extensions?.code as string, error.message),
      })
    },
    onCompleted(data) {
      const otp = data.sendOTPByEmail
      if (otp) {
        setSentOtp(true)
        setOtpData(otp)
      }
    },
  })

  const handleSendOtpByEmail = (email: string) => {
    sendOtpByEmail({
      variables: {
        input: {
          action,
          email,
          authFlowIntent,
        },
      } as any,
    })
  }

  useEffect(() => {
    if (initEmail) {
      setInputEmail(initEmail)
      handleSendOtpByEmail(initEmail)
    }
  }, [initEmail])

  if (!initEmail && loading) {
    return <Loader />
  }

  return (
    <>
      {initEmail || (sentOtp && otpData) ? (
        <VerifyOneTimePassword
          action={action}
          otp={otpData || ({} as OtpResponseFragment)}
          handleSendOtpByEmail={handleSendOtpByEmail}
          inputEmail={inputEmail || user.email || ''}
          handleVerify={handleVerify}
          onClose={onClose}
        />
      ) : (
        <ReceiveOneTimePassword
          action={action}
          setInputEmail={setInputEmail}
          handleSendOtpByEmail={handleSendOtpByEmail}
          loading={loading}
        />
      )}
    </>
  )
}
