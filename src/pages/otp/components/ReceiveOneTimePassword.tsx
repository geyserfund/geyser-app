import { Button, Image, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ControlledTextInput } from '@/shared/components/controlledInput'
import { Body } from '@/shared/components/typography'
import { VerifyEmailImageUrl } from '@/shared/constants'

import { useAuthContext } from '../../../context'
import { MfaAction, useUserEmailUpdateMutation } from '../../../types'
import { emailValidationSchema, useNotification } from '../../../utils'

interface ReceiveOneTimePasswordProps {
  handleSendOtpByEmail(email: string): void
  action: MfaAction
  setInputEmail: Dispatch<SetStateAction<string>>
  loading?: boolean
}

export const ReceiveOneTimePassword = ({
  handleSendOtpByEmail,
  action,
  setInputEmail,
  loading,
}: ReceiveOneTimePasswordProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()
  const canEditEmail = !user.email || !user.isEmailVerified

  const form = useForm<{ email: string }>({
    resolver: canEditEmail ? yupResolver(emailValidationSchema) : undefined,
    values: user.email
      ? {
          email: user.email,
        }
      : undefined,
  })

  const [updateUserEmail] = useUserEmailUpdateMutation({
    onError() {
      toast({
        status: 'error',
        title: 'Failed to update email.',
        description: 'Please try again',
      })
    },
    onCompleted(data) {
      const emailUpdateUser = data.userEmailUpdate
      if (emailUpdateUser && emailUpdateUser.email) {
        setUser((current) => ({ ...current, ...emailUpdateUser }))
        handleSendOtpByEmail(emailUpdateUser.email)
      }
    },
  })

  const handleReceiveOneTimePassword = async ({ email }: { email: string }) => {
    setInputEmail(email)
    if (!canEditEmail || action === MfaAction.Login) {
      handleSendOtpByEmail(user.email || email)
    } else {
      updateUserEmail({
        variables: {
          input: {
            email,
          },
        },
      })
    }
  }

  const getDescription = () => {
    if (action === MfaAction.ProjectWalletUpdate) {
      return t('You can update your wallet securely by using the One Time Password sent to your verified email.')
    }

    if (action === MfaAction.UserEmailUpdate) {
      return t('You can update your email securely by using One Time Password sent to your last verfied email.')
    }

    if (action === MfaAction.Login) {
      return t('You can login securely by using One Time Password sent to your email.')
    }

    return t(
      'Backup your Geyser account and project with your email. This will ensure that you can always access Geyser (in case of social media censorship) and can securely update your project information.',
    )
  }

  return (
    <VStack>
      <Image src={VerifyEmailImageUrl} alt="verify-email-image" w={200} h={200} alignSelf="center" />

      <Body medium>
        {getDescription()} {t('Check your SPAM folder for the email.')}
      </Body>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          form.handleSubmit(handleReceiveOneTimePassword)(e)
        }}
      >
        <VStack spacing="10px">
          <ControlledTextInput
            required
            control={form.control}
            name="email"
            label={canEditEmail ? t('Email input') : t('Your email')}
            isDisabled={!canEditEmail}
          />
          <Button w="full" variant="solid" colorScheme="primary1" type="submit" isLoading={loading}>
            {t('Receive One Time Password')}
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}
