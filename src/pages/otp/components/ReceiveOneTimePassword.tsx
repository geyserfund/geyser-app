import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { useAuthContext } from '../../../context'
import { TextField } from '../../../forms/components/TextField'
import { useUserEmailUpdateMutation } from '../../../types'
import { useNotification } from '../../../utils'

const schema = yup.object({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Please enter a valid Email address'),
})

interface ReceiveOneTimePasswordProps {
  handleSendOtpByEmail(email: string): void
}

export const ReceiveOneTimePassword = ({
  handleSendOtpByEmail,
}: ReceiveOneTimePasswordProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()
  const hasEmail = Boolean(user.email)

  const form = useForm<{ email: string }>({
    resolver: !hasEmail ? yupResolver(schema) : undefined,
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
    if (user.email) {
      handleSendOtpByEmail(user.email)
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
          label={hasEmail ? t('Your email') : t('Input your email')}
          isDisabled={hasEmail}
          defaultValue={user.email || undefined}
        />
        <Button w="full" variant="primary" type="submit">
          {t('Receive One Time Password')}
        </Button>
      </VStack>
    </form>
  )
}
