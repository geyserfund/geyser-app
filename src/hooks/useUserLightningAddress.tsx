import { useLazyQuery, useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'

import {
  MUTATION_CREATE_WALLET,
  MUTATION_DELETE_WALLET,
  MUTATION_UPDATE_WALLET,
} from '../graphql/mutations'
import { QUERY_LIGHTNING_ADDRESS_VERIFY } from '../graphql/queries/wallet'
import {
  LightningAddressVerifyResponse,
  User,
  WalletResourceType,
} from '../types'
import { useNotification, validateEmail } from '../utils'
import { getUserLightningAddress } from '../utils/validations/wallet'

export enum LNAddressEvaluationState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
}

type LightningAddressVerificationQueryVariables = {
  lightningAddress: string
}

type LightningAddressVerificationResponseData = {
  lightningAddressVerify: LightningAddressVerifyResponse
}

export const useUserLightningAddress = (user?: User) => {
  const { unexpected } = useNotification()
  const [lightningAddress, setLightningAddress] = useState(() => {
    return getUserLightningAddress(user)
  })

  const [validationError, setValidationError] = useState<string | null>(null)
  const [evaluationError, setEvaluationError] = useState<string | null>(null)
  const [mutationError, setMutationError] = useState<string | null>(null)

  const [evaluationState, setEvaluationState] =
    useState<LNAddressEvaluationState>(LNAddressEvaluationState.IDLE)

  const [evaluateLightningAddress] = useLazyQuery<
    LightningAddressVerificationResponseData,
    LightningAddressVerificationQueryVariables
  >(QUERY_LIGHTNING_ADDRESS_VERIFY, {
    variables: {
      lightningAddress,
    },
    onCompleted({ lightningAddressVerify: { valid } }) {
      if (Boolean(valid) === false) {
        setEvaluationState(LNAddressEvaluationState.FAILED)
        setValidationError(
          'We could not validate this as a working Lightning Address.',
        )
      } else {
        setEvaluationState(LNAddressEvaluationState.SUCCEEDED)
      }
    },
    onError() {
      setEvaluationState(LNAddressEvaluationState.FAILED)
      unexpected()
    },
  })

  const [createWallet, { loading: createLoading }] = useMutation(
    MUTATION_CREATE_WALLET,
    {
      onError: unexpected,
    },
  )

  const [updateWallet, { loading: updateLoading }] = useMutation(
    MUTATION_UPDATE_WALLET,
    {
      onError: unexpected,
    },
  )

  const [deleteWallet, { loading: deleteLoading }] = useMutation(
    MUTATION_DELETE_WALLET,
    {
      onError() {
        unexpected()
        setLightningAddress(getUserLightningAddress(user))
      },
    },
  )

  const validate = useCallback(() => {
    setEvaluationState(LNAddressEvaluationState.IDLE)
    setEvaluationError(null)
    if (lightningAddress.length === 0) {
      setValidationError(null)
      return true
    }

    if (lightningAddress.endsWith('@geyser.fund')) {
      setValidationError(
        `Custom Lightning Addresses can't end with "@geyser.fund".`,
      )
      return false
    }

    if (validateEmail(lightningAddress) === false) {
      setValidationError(
        `Please use a valid email-formatted address for your Lightning Address.`,
      )
      return false
    }

    setValidationError(null)
    return true
  }, [lightningAddress])

  const evaluate = useCallback(async () => {
    setEvaluationState(LNAddressEvaluationState.LOADING)
    const { data } = await evaluateLightningAddress()

    if (
      data &&
      data.lightningAddressVerify &&
      Boolean(data.lightningAddressVerify.valid)
    ) {
      setEvaluationState(LNAddressEvaluationState.SUCCEEDED)
      return true
    }

    setEvaluationState(LNAddressEvaluationState.FAILED)
    setEvaluationError(
      'We could not validate this as a working Lightning Address.',
    )
    return false
  }, [evaluateLightningAddress])

  const mutate = useCallback(async () => {
    if (!user) return

    const alreadyHasAddress =
      user?.wallet &&
      user.wallet.id &&
      user.wallet.connectionDetails.__typename ===
        'LightningAddressConnectionDetails'

    if (lightningAddress.length === 0) {
      // delete wallet if it exists
      if (user.wallet && alreadyHasAddress) {
        const data = await deleteWallet({
          variables: { walletId: user.wallet.id },
        })
        if (data) {
          return setLightningAddress('')
        }

        return setLightningAddress(getUserLightningAddress(user))
      }

      return
    }

    if (
      !validationError &&
      lightningAddress !== getUserLightningAddress(user) &&
      (await evaluate())
    ) {
      if (alreadyHasAddress) {
        return updateWallet({
          variables: {
            input: getUpdateWalletInput(lightningAddress, user.wallet?.id),
          },
          onError() {
            setMutationError(
              'We could not save this as your Lightning Address, please try again later',
            )
          },
        })
      }

      return createWallet({
        variables: { input: getCreateWalletInput(lightningAddress, user.id) },
        onError() {
          setMutationError(
            'We could not save this as your Lightning Address, please try again later',
          )
        },
      })
    }
  }, [
    validationError,
    lightningAddress,
    user,
    evaluate,
    updateWallet,
    createWallet,
    deleteWallet,
  ])

  return {
    evaluationState,
    error: validationError || evaluationError || mutationError || null,
    loading: createLoading || updateLoading || deleteLoading || false,
    lightningAddress,
    setLightningAddress,
    validate,
    mutate,
  }
}

const getCreateWalletInput = (lightningAddress: string, userId: number) => {
  const resourceInput: {
    resourceId: number
    resourceType: WalletResourceType
  } = {
    resourceId: Number(userId),
    resourceType: WalletResourceType.User,
  }

  return {
    lightningAddressConnectionDetailsInput: {
      lightningAddress,
    },
    resourceInput,
  }
}

const getUpdateWalletInput = (lightningAddress: string, walletId: number) => {
  return {
    lightningAddressConnectionDetailsInput: {
      lightningAddress,
    },
    id: walletId,
  }
}
