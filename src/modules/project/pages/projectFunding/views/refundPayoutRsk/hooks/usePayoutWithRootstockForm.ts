import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { getAddress, isAddress } from 'viem'
import * as yup from 'yup'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  AccountKeys,
  decryptSeed,
  generateKeysFromSeedHex,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { useNotification } from '@/utils/index.ts'

/** Form data interface for Rootstock native payout */
export type RootstockPayoutFormData = {
  rootstockAddress?: string
  accountPassword?: string
}

type PayoutKeyDerivationOptions = {
  deriveKeysFromSeed?: (seedHex: string) => AccountKeys
  storeKeyPair?: boolean
  requireRootstockAddress?: boolean
}

/** Custom hook for Rootstock native payout form management */
export const usePayoutWithRootstockForm = (
  onSubmit: (data: RootstockPayoutFormData, accountKeys: AccountKeys) => Promise<void> | void,
  accountKeys?: AccountKeys,
  keyDerivationOptions?: PayoutKeyDerivationOptions,
) => {
  const toast = useNotification()
  const { isLoading: isLoadingUserAccountKeys } = useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)

  const rootstockPayoutSchema = yup.object({
    rootstockAddress:
      keyDerivationOptions?.requireRootstockAddress ?? true
        ? yup
            .string()
            .required(t('Rootstock address is required'))
            .test({
              test(value) {
                if (!value || !isAddress(value)) {
                  return false
                }

                try {
                  getAddress(value)
                  return true
                } catch {
                  return false
                }
              },
              message: t('The Rootstock address you entered is invalid'),
            })
        : yup.string(),
    accountPassword: accountKeys ? yup.string() : yup.string().required(t('Account password is required')),
  })

  const form = useForm<RootstockPayoutFormData>({
    resolver: yupResolver(rootstockPayoutSchema),
    mode: 'onBlur',
    defaultValues: {
      rootstockAddress: '',
      accountPassword: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = form

  const hasNoVisibleRequiredInput = Boolean(accountKeys) && keyDerivationOptions?.requireRootstockAddress === false
  const enableSubmit =
    isValid && (isDirty || hasNoVisibleRequiredInput) && (Boolean(accountKeys) || !isLoadingUserAccountKeys)

  const handleFormSubmit = handleSubmit(async (data: RootstockPayoutFormData) => {
    if (!accountKeys && isLoadingUserAccountKeys) {
      return
    }

    if (!userAccountKeys?.encryptedSeed && !accountKeys) {
      toast.error({
        title: t('Unable to find your account keys'),
        description: t('Please refresh the page and try again.'),
      })
      return
    }

    try {
      if (!accountKeys) {
        const decryptedSeed = await decryptSeed(userAccountKeys?.encryptedSeed || '', data.accountPassword || '')

        const deriveKeysFromSeed = keyDerivationOptions?.deriveKeysFromSeed || generateKeysFromSeedHex
        const derivedKeys = deriveKeysFromSeed(decryptedSeed)

        if (keyDerivationOptions?.storeKeyPair !== false) {
          setUserAccountKeyPair({ privateKey: derivedKeys.privateKey, publicKey: derivedKeys.publicKey })
        }

        onSubmit(data, derivedKeys)
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
