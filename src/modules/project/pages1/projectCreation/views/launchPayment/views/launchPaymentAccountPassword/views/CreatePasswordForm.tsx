import { VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UserAccountKeysFragment } from '@/types/index.ts'

import { FeedBackText } from '../components/FeedBackText.tsx'
import { useUpdateAccountPassword } from '../hooks/useUpdateAccountPassword.ts'

export type CreatePasswordFormData = {
  password: string
  repeatPassword: string
}

export type CreatePasswordFormProps = {
  form: UseFormReturn<CreatePasswordFormData>
}

/** Account password form component with password and repeat password fields */
export const CreatePasswordForm = ({ form }: CreatePasswordFormProps) => {
  const { control } = form
  return (
    <VStack w="full" gap={4}>
      <VStack w="full" alignItems="start" gap={2}>
        <Body>
          {t(
            'Configure your account password. This password is known only by you, and no one but you has access to the project funds.',
          )}
        </Body>
        <FeedBackText />
      </VStack>
      <ControlledTextInput
        name="password"
        control={control}
        label={t('Enter your password')}
        placeholder={t('Enter your password')}
        type="password"
        required
      />
      <ControlledTextInput
        name="repeatPassword"
        control={control}
        label={t('Repeat password')}
        placeholder={t('Repeat your password')}
        type="password"
        required
      />
    </VStack>
  )
}

const createPasswordSchema = yup.object({
  password: yup.string().required(t('Password is required')).min(8, t('Password must be at least 8 characters long')),
  repeatPassword: yup
    .string()
    .required(t('Please repeat your password'))
    .oneOf([yup.ref('password')], t('Passwords must match')),
})

export const useCreateAccountForm = (onComplete: (_: UserAccountKeysFragment) => void) => {
  const form = useForm<CreatePasswordFormData>({
    resolver: yupResolver(createPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  })

  const { onSubmit, isSubmitting } = useUpdateAccountPassword(onComplete)

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  }
}
