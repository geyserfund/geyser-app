import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { useAuthContext } from '../../../context'
import { TextField } from '../../../forms/components/TextField'
import { MfaAction, useUserEmailUpdateMutation } from '../../../types'
import { useNotification } from '../../../utils'

const schema = yup.object({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Please enter a valid Email address'),
})

interface ReceiveOneTimePasswordProps {
  handleSendOtpByEmail(email: string): void
  action: MfaAction
  setInputEmail: Dispatch<SetStateAction<string>>
}

export const ReceiveOneTimePassword = ({
  handleSendOtpByEmail,
  action,
  setInputEmail,
}: ReceiveOneTimePasswordProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { user, setUser, isUserAProjectCreator } = useAuthContext()
  const canEditEmail = !user.email || !isUserAProjectCreator

  const form = useForm<{ email: string }>({
    resolver: canEditEmail ? yupResolver(schema) : undefined,
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
      console.log('data', data)
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

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        form.handleSubmit(handleReceiveOneTimePassword)(e)
      }}
    >
      <VStack spacing="10px">
        <TextField
          required
          control={form.control}
          name="email"
          label={canEditEmail ? t('Email input') : t('Your email')}
          isDisabled={!canEditEmail}
          defaultValue={user.email || undefined}
        />
        <Button w="full" variant="primary" type="submit">
          {t('Receive One Time Password')}
        </Button>
      </VStack>
    </form>
  )
}
