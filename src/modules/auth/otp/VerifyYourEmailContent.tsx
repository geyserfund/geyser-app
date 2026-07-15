import { t } from 'i18next'
import { useCallback, useEffect, useRef, useState } from 'react'

import Loader from '@/components/ui/Loader'
import { useAuthContext } from '@/context'
import {
  AuthFlowIntent as GeneratedAuthFlowIntent,
  MfaAction,
  OtpResponseFragment,
  useSendOtpByEmailMutation,
} from '@/types'
import { useNotification } from '@/utils'

import { getAuthFailureMessage } from '../authFailure.ts'
import { AuthFlowIntent } from '../type.ts'
import { ReceiveOneTimePassword } from './components/ReceiveOneTimePassword.tsx'
import { VerifyOneTimePassword } from './components/VerifyOneTimePassword.tsx'

export interface VerifyYourEmailContentProps {
  action: MfaAction
  otpSent?: boolean
  otpData?: OtpResponseFragment
  initEmail?: string
  handleVerify?: (otpCode: number, otpData: OtpResponseFragment, email?: string) => void
  onClose?: () => void
  onInitialOtpError?: () => void
  authFlowIntent?: AuthFlowIntent
}

export const VerifyYourEmailContent = ({
  initEmail,
  action,
  handleVerify,
  otpSent,
  otpData: otp,
  onClose,
  onInitialOtpError,
  authFlowIntent,
}: VerifyYourEmailContentProps) => {
  const { toast } = useNotification()
  const { user } = useAuthContext()

  const [sentOtp, setSentOtp] = useState(otpSent || false)
  const [otpData, setOtpData] = useState<OtpResponseFragment | undefined>(otp)
  const [inputEmail, setInputEmail] = useState('')
  const initialOtpRequestEmail = useRef<string>()
  const initialOtpRequestPending = useRef(false)

  const [sendOtpByEmail, { loading }] = useSendOtpByEmailMutation({
    onError(error) {
      const graphQLError =
        error.graphQLErrors?.[0] ||
        (
          error.networkError as {
            result?: { errors?: Array<{ message?: string; extensions?: { code?: string } }> }
          } | null
        )?.result?.errors?.[0]

      toast({
        status: 'error',
        title: t('Failed to generate OTP.'),
        description: getAuthFailureMessage(
          t,
          graphQLError?.extensions?.code as string | undefined,
          graphQLError?.message || t('Please try again'),
        ),
      })
      if (initialOtpRequestPending.current) {
        initialOtpRequestPending.current = false
        onInitialOtpError?.()
      }
    },
    onCompleted(data) {
      const otp = data.sendOTPByEmail
      if (otp) {
        initialOtpRequestPending.current = false
        setSentOtp(true)
        setOtpData(otp)
      }
    },
  })

  const handleSendOtpByEmail = useCallback(
    (email: string) => {
      sendOtpByEmail({
        variables: {
          input: {
            action,
            email,
            authFlowIntent:
              authFlowIntent === AuthFlowIntent.signup ? GeneratedAuthFlowIntent.Signup : GeneratedAuthFlowIntent.Login,
          },
        },
      })
    },
    [action, authFlowIntent, sendOtpByEmail],
  )

  useEffect(() => {
    if (!initEmail || initialOtpRequestEmail.current === initEmail) {
      return
    }

    initialOtpRequestEmail.current = initEmail
    initialOtpRequestPending.current = true
    setInputEmail(initEmail)
    handleSendOtpByEmail(initEmail)
  }, [handleSendOtpByEmail, initEmail])

  if (loading && !otpData) {
    return <Loader />
  }

  return (
    <>
      {sentOtp && otpData ? (
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
