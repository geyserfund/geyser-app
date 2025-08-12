import { VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UserAccountKeysFragment } from '@/types/index.ts'

import { useUpdateAccountPassword } from '../hooks/useUpdateAccountPassword.ts'
import { FeedBackText } from './FeedBackText.tsx'

export type CreatePasswordFormData = {
  password: string
  repeatPassword: string
}

export type CreatePasswordFormProps = {
  isCreator?: boolean
  form: UseFormReturn<CreatePasswordFormData>
}

const creatorText = t(
  'Configure your account password. Only you will know this password, and no one but you has access to the project funds.',
)
const contributorText = t(
  'Configure your account password. Only you will know this password, and it will be required to refund your contribution.',
)

/** Account password form component with password and repeat password fields */
export const CreatePasswordForm = ({ form, isCreator }: CreatePasswordFormProps) => {
  const { control } = form
  return (
    <VStack w="full" gap={4}>
      <VStack w="full" alignItems="start" gap={2}>
        <Body>{isCreator ? creatorText : contributorText}</Body>
        <FeedBackText isCreator={isCreator} />
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
