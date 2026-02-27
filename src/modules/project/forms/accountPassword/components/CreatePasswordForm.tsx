import { VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { ReactNode } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

import { ControlledCheckboxInput } from '@/shared/components/controlledInput/ControlledCheckboxInput.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import type { BodyProps } from '@/shared/components/typography/Body.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UserAccountKeysFragment } from '@/types/index.ts'

import { useUpdateAccountPassword } from '../hooks/useUpdateAccountPassword.ts'
import { accountPasswordAtom } from '../state/passwordStorageAtom.ts'
import { FeedBackText } from './FeedBackText.tsx'
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle.tsx'

export type CreatePasswordFormData = {
  password: string
  repeatPassword: string
  acknowledgePassword: boolean
  acknowledgeFundsLoss: boolean
}

export type CreatePasswordFormProps = {
  isCreator?: boolean
  form: UseFormReturn<CreatePasswordFormData>
  introText?: string
  introSize?: BodyProps['size']
  importantContent?: ReactNode
  showFeedback?: boolean
  hidePasswordLabel?: boolean
}

const creatorText = t(
  'Configure your account password. Only you will know this password, and no one but you has access to the project funds.',
)
const contributorText = t(
  'Configure your account password. Only you will know this password, and it will be required to refund your contribution.',
)

/** Account password form component with password and repeat password fields */
export const CreatePasswordForm = ({
  form,
  isCreator,
  introText,
  introSize,
  importantContent,
  showFeedback,
  hidePasswordLabel,
}: CreatePasswordFormProps) => {
  const { control } = form
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const bodyText = introText ?? (isCreator ? creatorText : contributorText)
  const shouldRenderFeedback = !importantContent && showFeedback !== false
  const passwordLabel = hidePasswordLabel ? undefined : t('Enter your password')
  const passwordAriaLabel = hidePasswordLabel ? t('Enter your password') : undefined

  return (
    <VStack w="full" gap={4}>
      <VStack w="full" alignItems="start" gap={2}>
        <Body size={introSize}>{bodyText}</Body>
        {importantContent || (shouldRenderFeedback ? <FeedBackText isCreator={isCreator} /> : null)}
      </VStack>
      <ControlledTextInput
        name="password"
        control={control}
        label={passwordLabel}
        placeholder={t('Enter your password')}
        aria-label={passwordAriaLabel}
        type={showPassword ? 'text' : 'password'}
        required
        rightAddon={
          <PasswordVisibilityToggle showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />
        }
      />
      <ControlledTextInput
        name="repeatPassword"
        control={control}
        label={t('Repeat password')}
        placeholder={t('Repeat your password')}
        type={showRepeatPassword ? 'text' : 'password'}
        required
        rightAddon={
          <PasswordVisibilityToggle
            showPassword={showRepeatPassword}
            onToggle={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <ControlledCheckboxInput
        name="acknowledgePassword"
        control={control}
        label={t('I acknowledge this password is known only by me and Geyser cannot recover it for me.')}
      />
      <ControlledCheckboxInput
        name="acknowledgeFundsLoss"
        control={control}
        label={t('I acknowledge losing this password could lead to loss of funds.')}
      />
    </VStack>
  )
}

const passwordValidationMessage = t(
  'Password must be at least 10 characters including one lowercase, one uppercase, and one special character.',
)

const createPasswordSchema = yup.object({
  password: yup
    .string()
    .required(t('Password is required'))
    .min(10, passwordValidationMessage)
    .matches(/[a-z]/, passwordValidationMessage)
    .matches(/[A-Z]/, passwordValidationMessage)
    .matches(/[!@#$%^&*(),.?":{}|<>[\]\\/'`~_+=\-;]/, passwordValidationMessage),
  repeatPassword: yup
    .string()
    .required(t('Please repeat your password'))
    .oneOf([yup.ref('password')], t('Passwords must match')),
  acknowledgePassword: yup.boolean().oneOf([true], t('Required')).required(),
  acknowledgeFundsLoss: yup.boolean().oneOf([true], t('Required')).required(),
})

export const useCreateAccountForm = (onComplete: (_: UserAccountKeysFragment) => void) => {
  const setAccountPassword = useSetAtom(accountPasswordAtom)

  const form = useForm<CreatePasswordFormData>({
    resolver: yupResolver(createPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      repeatPassword: '',
      acknowledgePassword: false,
      acknowledgeFundsLoss: false,
    },
  })

  const { onSubmit: updatePasswordOnSubmit, isSubmitting } = useUpdateAccountPassword((data) => {
    setAccountPassword(form.getValues('password'))
    onComplete(data)
  })

  return {
    ...form,
    onSubmit: form.handleSubmit(updatePasswordOnSubmit),
    isSubmitting,
  }
}
