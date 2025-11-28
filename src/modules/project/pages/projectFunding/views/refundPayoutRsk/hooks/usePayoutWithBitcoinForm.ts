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
import { getBitcoinAddress } from '@/utils/lightning/bip21.ts'

import { validateBitcoinAddress } from '../../fundingPayment/views/paymentOnchain/utils/validateAddress.ts'

/** Form data interface for Bitcoin On-Chain payout */
export type BitcoinPayoutFormData = {
  bitcoinAddress: string
  accountPassword: string
}

/** Validation schema for Bitcoin On-Chain payout form */
export const bitcoinPayoutSchema = yup.object({
  bitcoinAddress: yup
    .string()
    .required(t('Bitcoin address is required'))
    .test({
      test(value) {
        const bitcoinAddress = getBitcoinAddress(value)
        if (bitcoinAddress.valid && bitcoinAddress.address) {
          return validateBitcoinAddress(bitcoinAddress.address)
        }

        return validateBitcoinAddress(value)
      },
      message: t('The Bitcoin address you entered is invalid'),
    }),
  accountPassword: yup.string().required(t('Account password is required')),
})

/** Custom hook for Bitcoin On-Chain payout form management */
export const usePayoutWithBitcoinForm = (
  onSubmit: (data: BitcoinPayoutFormData, accountKeys: AccountKeys) => Promise<void> | void,
  accountKeys?: AccountKeys,
) => {
  const toast = useNotification()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)

  const form = useForm<BitcoinPayoutFormData>({
    resolver: yupResolver(bitcoinPayoutSchema),
    mode: 'onBlur',
    defaultValues: {
      bitcoinAddress: '',
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

  const handleFormSubmit = handleSubmit(async (data: BitcoinPayoutFormData) => {
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
