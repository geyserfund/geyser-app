import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  AccountKeys,
  decryptSeed,
  generateKeysFromSeedHex,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { useNotification } from '@/utils/index.ts'

/** Form data interface for Lightning payout */
export type LightningPayoutFormData = {
  lightningAddress?: string
  accountPassword: string
}

/** Validation schema for Lightning payout form */
export const lightningPayoutSchema = yup.object({
  lightningAddress: yup.string(),
  accountPassword: yup.string().required(t('Account password is required')),
})

/** Custom hook for Lightning payout form management */
export const usePayoutWithLightningForm = (
  onSubmit: (data: LightningPayoutFormData, accountKeys: AccountKeys) => Promise<void> | void,
  accountKeys?: AccountKeys,
) => {
  const toast = useNotification()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)

  const form = useForm<LightningPayoutFormData>({
    resolver: yupResolver(lightningPayoutSchema),
    mode: 'onBlur',
    defaultValues: {
      lightningAddress: '',
      accountPassword: accountKeys ? '********' : '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = form

  const enableSubmit = isValid && isDirty

  const handleFormSubmit = handleSubmit(async (data: LightningPayoutFormData) => {
    if (!userAccountKeys?.encryptedSeed) {
      toast.error({
        title: t('Unable to find your account keys'),
        description: t('Please refresh the page and try again.'),
      })
      return
    }

    try {
      if (!accountKeys) {
        const decryptedSeed = await decryptSeed(userAccountKeys?.encryptedSeed, data.accountPassword)

        const accountKeys = generateKeysFromSeedHex(decryptedSeed)

        setUserAccountKeyPair({ privateKey: accountKeys.privateKey, publicKey: accountKeys.publicKey })
        console.log('accountKeys', accountKeys)

        onSubmit(data, accountKeys)
      } else {
        onSubmit(data, accountKeys)
      }
    } catch (error) {
      form.setError('accountPassword', { message: t('Invalid password') })
    }
  })

  return {
    control,
    errors,
    enableSubmit,
    handleSubmit: handleFormSubmit,
    reset,
    watch,
    form,
  }
}
