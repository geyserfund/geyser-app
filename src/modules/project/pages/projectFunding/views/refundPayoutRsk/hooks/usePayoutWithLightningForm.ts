import { ApolloError } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  AccountKeys,
  decryptSeed,
  generateKeysFromSeedHex,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { Limits, LNAddressEvaluationState } from '@/modules/project/pages/projectCreation/hooks/useWalletForm.tsx'
import { useDebounce } from '@/shared/hooks'
import { useLightningAddressVerifyLazyQuery } from '@/types/index.ts'
import { commaFormatted, validateEmail } from '@/utils/index.ts'
import { useNotification } from '@/utils/index.ts'

/** Form data interface for Lightning payout */
export type LightningPayoutFormData = {
  lightningAddress: string
  accountPassword?: string
}

export type LightningAddressValidation = {
  error: string | null
  evaluating: boolean
  limits: Limits
  showLimits: boolean
  state: LNAddressEvaluationState
  validate: () => Promise<boolean>
}

type PayoutKeyDerivationOptions = {
  deriveKeysFromSeed?: (seedHex: string) => AccountKeys
  storeKeyPair?: boolean
}

/** Custom hook for Lightning payout form management */
export const usePayoutWithLightningForm = (
  onSubmit: (data: LightningPayoutFormData, accountKeys: AccountKeys) => Promise<void> | void,
  accountKeys?: AccountKeys,
  keyDerivationOptions?: PayoutKeyDerivationOptions,
  satsAmount?: number,
) => {
  const toast = useNotification()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)
  const [lightningAddressLimits, setLightningAddressLimits] = useState<Limits>({})
  const [lightningAddressEvaluationState, setLightningAddressEvaluationState] = useState<LNAddressEvaluationState>(
    LNAddressEvaluationState.IDLE,
  )
  const [evaluatedLightningAddress, setEvaluatedLightningAddress] = useState('')

  const lightningPayoutSchema = yup.object({
    lightningAddress: yup.string().required(t('Lightning address is required')),
    accountPassword: accountKeys ? yup.string() : yup.string().required(t('Account password is required')),
  })

  const form = useForm<LightningPayoutFormData>({
    resolver: yupResolver(lightningPayoutSchema),
    mode: 'onBlur',
    defaultValues: {
      lightningAddress: '',
      accountPassword: '',
    },
  })

  const lightningAddressValue = form.watch('lightningAddress') || ''
  const debouncedLightningAddress = useDebounce(lightningAddressValue, 200)
  const currentLightningAddressError = form.formState.errors.lightningAddress?.message
    ? `${form.formState.errors.lightningAddress.message}`
    : null
  const isCurrentAddressEvaluated =
    Boolean(lightningAddressValue) && lightningAddressValue === evaluatedLightningAddress
  const currentLightningAddressState = isCurrentAddressEvaluated
    ? lightningAddressEvaluationState
    : LNAddressEvaluationState.IDLE
  const showLightningAddressLimits =
    isCurrentAddressEvaluated &&
    (typeof lightningAddressLimits.min === 'number' || typeof lightningAddressLimits.max === 'number')

  const [evaluateLightningAddress, { loading: isEvaluatingLightningAddress }] = useLightningAddressVerifyLazyQuery()

  const getLightningAmountLimitError = useCallback(
    (limits: Limits) => {
      if (typeof satsAmount !== 'number') {
        return null
      }

      if (typeof limits.min === 'number' && satsAmount < limits.min) {
        return t('This amount ({{amount}} sats) is below this wallet’s minimum receivable limit of {{limit}} sats.', {
          amount: commaFormatted(satsAmount),
          limit: commaFormatted(limits.min),
        })
      }

      if (typeof limits.max === 'number' && satsAmount > limits.max) {
        return t('This amount ({{amount}} sats) exceeds this wallet’s maximum receivable limit of {{limit}} sats.', {
          amount: commaFormatted(satsAmount),
          limit: commaFormatted(limits.max),
        })
      }

      return null
    },
    [satsAmount],
  )

  const setLightningAddressValidationError: (message: string) => void = useCallback(
    (message: string) => {
      form.setError('lightningAddress', { message })
      setLightningAddressEvaluationState(LNAddressEvaluationState.FAILED)
    },
    [form],
  )

  const validateLightningAddressFormat = useCallback(
    (lightningAddress: string) => {
      if (!lightningAddress) {
        form.clearErrors('lightningAddress')
        setLightningAddressEvaluationState(LNAddressEvaluationState.IDLE)
        setEvaluatedLightningAddress('')
        setLightningAddressLimits({})
        return false
      }

      if (lightningAddress.endsWith('@geyser.fund')) {
        setLightningAddressValidationError(t('Custom Lightning Addresses can\'t end with "@geyser.fund".'))
        setEvaluatedLightningAddress(lightningAddress)
        setLightningAddressLimits({})
        return false
      }

      if (validateEmail(lightningAddress) === false) {
        setLightningAddressValidationError(t('Please use a valid email-formatted address for your Lightning Address.'))
        setEvaluatedLightningAddress(lightningAddress)
        setLightningAddressLimits({})
        return false
      }

      form.clearErrors('lightningAddress')
      return true
    },
    [form, setLightningAddressValidationError],
  )

  const handleLightningAddressVerificationError = useCallback(
    (error: ApolloError, lightningAddress: string) => {
      if ((form.getValues('lightningAddress') || '') !== lightningAddress) {
        return false
      }

      setEvaluatedLightningAddress(lightningAddress)
      setLightningAddressLimits({})
      setLightningAddressValidationError(
        t('We could not validate this Lightning Address due to an error: {{message}}', { message: error.message }),
      )
      return false
    },
    [form, setLightningAddressValidationError],
  )

  const validateLightningAddress = useCallback(async () => {
    const lightningAddress = form.getValues('lightningAddress') || ''

    if (!validateLightningAddressFormat(lightningAddress)) {
      return false
    }

    setLightningAddressEvaluationState(LNAddressEvaluationState.LOADING)

    try {
      const response = await evaluateLightningAddress({
        variables: { lightningAddress },
      })

      if ((form.getValues('lightningAddress') || '') !== lightningAddress) {
        return false
      }

      const verification = response.data?.lightningAddressVerify
      const limits = verification?.limits || {}

      setEvaluatedLightningAddress(lightningAddress)
      setLightningAddressLimits(limits)

      if (verification?.valid !== true) {
        setLightningAddressValidationError(
          t('We could not validate this as a working Lightning Address: {{reason}}', {
            reason: verification?.reason || t('Unknown reason'),
          }),
        )
        return false
      }

      const limitError = getLightningAmountLimitError(limits)

      if (limitError) {
        setLightningAddressValidationError(limitError)
        return false
      }

      form.clearErrors('lightningAddress')
      setLightningAddressEvaluationState(LNAddressEvaluationState.SUCCEEDED)
      return true
    } catch (error) {
      return handleLightningAddressVerificationError(error as ApolloError, lightningAddress)
    }
  }, [
    evaluateLightningAddress,
    form,
    getLightningAmountLimitError,
    handleLightningAddressVerificationError,
    setLightningAddressValidationError,
    validateLightningAddressFormat,
  ])

  useEffect(() => {
    if (!lightningAddressValue) {
      setLightningAddressEvaluationState(LNAddressEvaluationState.IDLE)
      setEvaluatedLightningAddress('')
      setLightningAddressLimits({})
      form.clearErrors('lightningAddress')
      return
    }

    if (lightningAddressValue === evaluatedLightningAddress) {
      return
    }

    setLightningAddressEvaluationState(LNAddressEvaluationState.IDLE)
    setLightningAddressLimits({})
    form.clearErrors('lightningAddress')
  }, [evaluatedLightningAddress, form, lightningAddressValue])

  useEffect(() => {
    if (!debouncedLightningAddress) {
      return
    }

    if (validateLightningAddressFormat(debouncedLightningAddress)) {
      validateLightningAddress().catch(() => undefined)
    }
  }, [debouncedLightningAddress, validateLightningAddress, validateLightningAddressFormat])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = form

  const enableSubmit =
    isValid &&
    isDirty &&
    currentLightningAddressState === LNAddressEvaluationState.SUCCEEDED &&
    !isEvaluatingLightningAddress

  const handleFormSubmit = handleSubmit(async (data: LightningPayoutFormData) => {
    if (!userAccountKeys?.encryptedSeed && !accountKeys) {
      toast.error({
        title: t('Unable to find your account keys'),
        description: t('Please refresh the page and try again.'),
      })
      return
    }

    try {
      const isLightningAddressValid = await validateLightningAddress()

      if (!isLightningAddressValid) {
        return
      }

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
    lightningAddress: {
      error: currentLightningAddressError,
      evaluating: isEvaluatingLightningAddress,
      limits: lightningAddressLimits,
      showLimits: showLightningAddressLimits,
      state: currentLightningAddressState,
      validate: validateLightningAddress,
    },
    reset,
    watch,
    form,
  }
}
