import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ReactNode } from 'react'

import { userAccountKeyPairAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import type { BodyProps } from '@/shared/components/typography/Body.tsx'
import { Maybe, UserAccountKeysFragment } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { AccountKeys, decryptSeed, generateKeysFromSeedHex } from '../keyGenerationHelper.ts'
import { accountPasswordAtom } from '../state/passwordStorageAtom.ts'
import { FeedBackText } from './FeedBackText.tsx'
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle.tsx'

export type ConfirmPasswordFormData = {
  password: string
}

type ConfirmPasswordFormProps = {
  control: Control<ConfirmPasswordFormData>
  onForgotPassword: () => void
  isCreator?: boolean
  introText?: string
  introSize?: BodyProps['size']
  importantContent?: ReactNode
  showFeedback?: boolean
  hidePasswordLabel?: boolean
}

const creatorText = t(
  'Confirm the password you have previously set. This password is known only by you and ensures no one but you has access to the project funds. ',
)

const contributorText = t(
  'Confirm the password you have previously set. This password is known only by you and ensures no one but you has access to the contributed funds.',
)

/** Password confirmation form component with single password field and forgot password option */
export const ConfirmPasswordForm = ({
  control,
  onForgotPassword,
  isCreator,
  introText,
  introSize,
  importantContent,
  showFeedback,
  hidePasswordLabel,
}: ConfirmPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

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
      <Button variant="link" size="sm" onClick={onForgotPassword} alignSelf="flex-start" color="primary1.11">
        {t('Forgotten your password?')}
      </Button>
    </VStack>
  )
}

const confirmPasswordSchema = yup.object({
  password: yup.string().required(t('Password is required')),
})

export const useConfirmPasswordForm = ({
  onComplete,
  keys,
}: {
  onComplete: (accountKeys: AccountKeys) => void
  keys?: Maybe<UserAccountKeysFragment>
}) => {
  const toast = useNotification()

  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)
  const storedPassword = useAtomValue(accountPasswordAtom)
  const setAccountPassword = useSetAtom(accountPasswordAtom)

  const form = useForm<ConfirmPasswordFormData>({
    resolver: yupResolver(confirmPasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      password: storedPassword || '',
    },
  })

  const onSubmit = async (data: ConfirmPasswordFormData) => {
    if (!keys || !keys.encryptedSeed) {
      toast.error({
        title: t('Unable to find your account keys'),
        description: t('Please refresh the page and try again.'),
      })
      return
    }

    try {
      const decryptedSeed = await decryptSeed(keys.encryptedSeed, data.password)

      const accountKeys = generateKeysFromSeedHex(decryptedSeed)

      setUserAccountKeyPair({ privateKey: accountKeys.privateKey, publicKey: accountKeys.publicKey })

      setAccountPassword(data.password)

      onComplete(accountKeys)
    } catch (error) {
      form.setError('password', { message: t('Invalid password') })
    }
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
