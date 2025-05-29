import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAuthContext } from '@/context'
import {
  ConnectionOption,
  LNAddressEvaluationState,
} from '@/modules/project/pages1/projectCreation/hooks/useWalletForm'
import { WalletConnectDetails } from '@/shared/constants'
import { useDebounce } from '@/shared/hooks'
import {
  CreateWalletInput,
  LightningAddressContributionLimits,
  Maybe,
  UpdateWalletInput,
  useCreateWalletMutation,
  useLightningAddressVerifyLazyQuery,
  UserWalletConnectionDetailsFragment,
  useUpdateWalletMutation,
  useUserWalletQuery,
  WalletOffChainContributionLimits,
  WalletOnChainContributionLimits,
  WalletResourceType,
} from '@/types'
import { toInt, useNotification, validateEmail } from '@/utils'

export type LightingWalletForm = {
  error: string | null
  state: LNAddressEvaluationState
  value: string
  setValue: (lightningAddress: string) => void
  evaluating: boolean
  validate: () => void
}

export type NWCWalletForm = {
  value: string
  setValue: (nostrWalletConnectURI: string) => void
}

export type Limits = {
  max?: Maybe<number>
  min?: Maybe<number>
}

export type UserWalletForm = {
  handleConfirm: () => void
  lightningAddress: LightingWalletForm
  nwc: NWCWalletForm
  isFormDirty: () => boolean
  connectionOption: ConnectionOption
  setConnectionOption: (connectionOption: ConnectionOption) => void
  createWalletInput: CreateWalletInput | null
  isLightningAddressInValid: boolean
  limits: Limits
  loading: boolean
}

const DEFAULT_LIGHTNING_FEE_PERCENTAGE = 0.05

export const useUserWalletForm = (): UserWalletForm => {
  const toast = useNotification()
  const { user } = useAuthContext()

  const [lightningAddressFormValue, setLightningAddressFormValue] = useState('')
  const [nostrWalletConnectURI, setNostrWalletConnectURI] = useState('')

  const [lightningAddressFormError, setLightningAddressFormError] = useState<string | null>(null)
  const [lnAddressEvaluationState, setLnAddressEvaluationState] = useState<LNAddressEvaluationState>(
    LNAddressEvaluationState.IDLE,
  )

  const [connectionOption, setConnectionOption] = useState<ConnectionOption>(ConnectionOption.LIGHTNING_ADDRESS)
  const [limits, setLimits] = useState<
    LightningAddressContributionLimits | WalletOffChainContributionLimits | WalletOnChainContributionLimits
  >({})

  const [existingWallet, setExistingWallet] = useState<UserWalletConnectionDetailsFragment>()

  // Query to get user wallet data
  const { data: userData, loading } = useUserWalletQuery({
    variables: {
      where: { id: user?.id },
    },
    skip: !user?.id, // Skip query if user ID is not available
    onCompleted(data) {
      if (data?.user?.wallet) {
        const userWallet = data.user.wallet
        setExistingWallet(userWallet)
        // Set wallet connection details based on type
        if (userWallet.connectionDetails?.__typename === WalletConnectDetails.LightningAddressConnectionDetails) {
          setConnectionOption(ConnectionOption.LIGHTNING_ADDRESS)
          setLightningAddressFormValue(userWallet.connectionDetails.lightningAddress || '')
          setLnAddressEvaluationState(LNAddressEvaluationState.SUCCEEDED)
        } else if (userWallet.connectionDetails?.__typename === WalletConnectDetails.NWCConnectionDetailsPrivate) {
          setConnectionOption(ConnectionOption.NWC)
          setNostrWalletConnectURI(userWallet.connectionDetails.nwcUrl || '')
        }
      }
    },
  })

  const [createWallet] = useCreateWalletMutation({
    onCompleted(data) {
      if (data?.walletCreate) {
        setExistingWallet(data.walletCreate)
        toast.success({
          title: t('Wallet connected successfully'),
        })
      }
    },
    onError(error) {
      toast.error({
        title: t('Wallet creation failed'),
        description: error.message,
      })
    },
  })
  const [updateWallet] = useUpdateWalletMutation({
    onCompleted(data) {
      if (data?.walletUpdate) {
        setExistingWallet(data.walletUpdate)
        toast.success({
          title: t('Wallet updated successfully'),
        })
      }
    },
    onError(error) {
      toast.error({
        title: t('Wallet update failed'),
        description: error.message,
      })
    },
  })

  const debouncedLightningAddress = useDebounce(lightningAddressFormValue, 200)

  const [evaluateLightningAddress, { loading: isEvaluatingLightningAddress }] = useLightningAddressVerifyLazyQuery({
    onCompleted({ lightningAddressVerify: { valid, reason, limits } }) {
      if (Boolean(valid) === false) {
        setLnAddressEvaluationState(LNAddressEvaluationState.FAILED)
        setLightningAddressFormError(
          t('We could not validate this as a working Lightning Address: {{reason}}', { reason }),
        )
      } else {
        setLightningAddressFormError('')
        setLnAddressEvaluationState(LNAddressEvaluationState.SUCCEEDED)
        if (limits) {
          setLimits(limits)
        }
      }
    },
    onError(error) {
      setLnAddressEvaluationState(LNAddressEvaluationState.FAILED)
      setLightningAddressFormError(
        t('We could not validate this Lightning Address due to an error: {{message}}', { message: error.message }),
      )
    },
  })

  const validateLightningAddress = useCallback(async () => {
    if (!lightningAddressFormValue) {
      setLightningAddressFormError(null)
      setLnAddressEvaluationState(LNAddressEvaluationState.IDLE)
      return
    }

    await evaluateLightningAddress({
      variables: { lightningAddress: lightningAddressFormValue },
    })
  }, [evaluateLightningAddress, lightningAddressFormValue])

  useEffect(() => {
    if (debouncedLightningAddress) {
      const valid = validateLightningAddressFormat(debouncedLightningAddress)
      if (valid) {
        validateLightningAddress()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- validateLightningAddressFormat is stable
  }, [debouncedLightningAddress, validateLightningAddress])

  const createWalletInput: CreateWalletInput | null = useMemo(() => {
    if (!user?.id) return null

    const resourceInput: {
      resourceId: number
      resourceType: WalletResourceType
    } = {
      resourceId: toInt(user.id),
      resourceType: WalletResourceType.User,
    }

    if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
      if (!lightningAddressFormValue) {
        return null
      }

      return {
        lightningAddressConnectionDetailsInput: {
          lightningAddress: lightningAddressFormValue,
        },
        resourceInput,
        feePercentage: DEFAULT_LIGHTNING_FEE_PERCENTAGE,
      }
    }

    if (connectionOption === ConnectionOption.NWC) {
      if (!nostrWalletConnectURI) {
        return null
      }

      return {
        nwcConnectionDetailsInput: {
          nwcUrl: nostrWalletConnectURI,
        },
        resourceInput,
        feePercentage: DEFAULT_LIGHTNING_FEE_PERCENTAGE,
      }
    }

    return null
  }, [user, connectionOption, lightningAddressFormValue, nostrWalletConnectURI])

  const handleSubmit = useCallback(
    async (input: CreateWalletInput | null) => {
      if (!input) {
        toast.error({
          title: t('Wallet creation failed'),
          description: t('Please provide valid wallet connection details'),
        })
        return
      }

      if (existingWallet && existingWallet.id) {
        const updateInput: UpdateWalletInput = {
          id: existingWallet.id,
          lightningAddressConnectionDetailsInput: input.lightningAddressConnectionDetailsInput,
          nwcConnectionDetailsInput: input.nwcConnectionDetailsInput,
          lndConnectionDetailsInput: input.lndConnectionDetailsInput,
          feePercentage: input.feePercentage,
          name: input.name,
        }

        updateWallet({
          variables: {
            input: updateInput,
          },
        })
      } else {
        createWallet({
          variables: { input },
        })
      }
    },
    [createWallet, existingWallet, toast, updateWallet],
  )

  const handleConfirm = useCallback(async () => {
    if (
      connectionOption === ConnectionOption.LIGHTNING_ADDRESS &&
      lightningAddressFormValue &&
      lnAddressEvaluationState !== LNAddressEvaluationState.SUCCEEDED
    ) {
      const response = await evaluateLightningAddress({
        variables: { lightningAddress: lightningAddressFormValue },
      })
      if (!response?.data?.lightningAddressVerify?.valid) {
        return
      }
    }

    if (!createWalletInput) {
      toast.error({
        title: t('failed to create user wallet'),
        description: t('please provide valid wallet details'),
      })
      return
    }

    handleSubmit(createWalletInput)
  }, [
    createWalletInput,
    handleSubmit,
    toast,
    lightningAddressFormValue,
    lnAddressEvaluationState,
    connectionOption,
    evaluateLightningAddress,
  ])

  const validateLightningAddressFormat = useCallback((lightningAddress: string): boolean => {
    if (!lightningAddress) {
      setLightningAddressFormError(null)
      setLnAddressEvaluationState(LNAddressEvaluationState.IDLE)
      return false
    }

    if (lightningAddress.endsWith('@geyser.fund')) {
      setLightningAddressFormError(t('Custom Lightning Addresses can\'t end with "@geyser.fund".'))
      return false
    }

    if (validateEmail(lightningAddress) === false) {
      setLightningAddressFormError(t('Please use a valid email-formatted address for your Lightning Address.'))
      return false
    }

    setLightningAddressFormError(null)
    return true
  }, [])

  const isFormDirty = useCallback(() => {
    const userWallet = userData?.user?.wallet

    if (userWallet) {
      if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
        if (userWallet.connectionDetails?.__typename === WalletConnectDetails.LightningAddressConnectionDetails) {
          return userWallet.connectionDetails.lightningAddress !== lightningAddressFormValue
        }

        return Boolean(lightningAddressFormValue)
      }

      if (connectionOption === ConnectionOption.NWC) {
        if (userWallet.connectionDetails?.__typename === WalletConnectDetails.NWCConnectionDetailsPrivate) {
          return userWallet.connectionDetails.nwcUrl !== nostrWalletConnectURI
        }

        return Boolean(nostrWalletConnectURI)
      }
    }

    return Boolean(lightningAddressFormValue || nostrWalletConnectURI)
  }, [userData, connectionOption, lightningAddressFormValue, nostrWalletConnectURI])

  const isLightningAddressInValid = useMemo(() => {
    if (
      connectionOption === ConnectionOption.LIGHTNING_ADDRESS &&
      ((lnAddressEvaluationState !== LNAddressEvaluationState.SUCCEEDED &&
        lnAddressEvaluationState !== LNAddressEvaluationState.IDLE) ||
        Boolean(lightningAddressFormError))
    ) {
      return true
    }

    return false
  }, [connectionOption, lnAddressEvaluationState, lightningAddressFormError])

  return {
    handleConfirm,
    lightningAddress: {
      error: lightningAddressFormError,
      state: lnAddressEvaluationState,
      value: lightningAddressFormValue,
      setValue: setLightningAddressFormValue,
      evaluating: isEvaluatingLightningAddress,
      validate: validateLightningAddress,
    },
    nwc: {
      value: nostrWalletConnectURI,
      setValue: setNostrWalletConnectURI,
    },
    limits,
    isFormDirty,
    connectionOption,
    setConnectionOption,
    createWalletInput,
    isLightningAddressInValid,
    loading,
  }
}
