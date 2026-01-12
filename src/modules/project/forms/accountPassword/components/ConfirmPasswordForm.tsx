import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { userAccountKeyPairAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
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
}

const creatorText = t(
  'Confirm the password you have previously set. This password is known only by you and ensures no one but you has access to the project funds. ',
)

const contributorText = t(
  'Confirm the password you have previously set. This password is known only by you and ensures no one but you has access to the contributed funds.',
)

/** Password confirmation form component with single password field and forgot password option */
export const ConfirmPasswordForm = ({ control, onForgotPassword, isCreator }: ConfirmPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

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
