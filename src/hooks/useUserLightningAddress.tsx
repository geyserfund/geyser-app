import { useLazyQuery, useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'

import { MUTATION_CREATE_WALLET } from '../graphql/mutations'
import { QUERY_LIGHTNING_ADDRESS_EVALUATION } from '../graphql/queries/wallet'
import {
  LightningAddressVerifyResponse,
  User,
  WalletResourceType,
} from '../types'
import { useNotification, validateEmail } from '../utils'
import { getLightningAddressFromUser } from '../utils/validations/wallet'

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
    return getLightningAddressFromUser(user)
  })

  const [validationError, setValidationError] = useState<string | null>(null)
  const [evaluationError, setEvaluationError] = useState<string | null>(null)
  const [mutationError, setMutationError] = useState<string | null>(null)

  const [evaluationState, setEvaluationState] =
    useState<LNAddressEvaluationState>(LNAddressEvaluationState.IDLE)

  const [evaluateLightningAddress] = useLazyQuery<
    LightningAddressVerificationResponseData,
    LightningAddressVerificationQueryVariables
  >(QUERY_LIGHTNING_ADDRESS_EVALUATION, {
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

  const [createWallet, { loading }] = useMutation(MUTATION_CREATE_WALLET, {
    onError: unexpected,
  })

  const getCreateWalletInput = useCallback(() => {
    if (!user) {
      return null
    }

    const resourceInput: {
      resourceId: number
      resourceType: WalletResourceType
    } = {
      resourceId: Number(user.id),
      resourceType: WalletResourceType.User,
    }

    return {
      lightningAddressConnectionDetailsInput: {
        lightningAddress,
      },
      resourceInput,
    }
  }, [lightningAddress, user])

  const validate = useCallback(() => {
    setEvaluationState(LNAddressEvaluationState.IDLE)
    setEvaluationError(null)
    if (lightningAddress.length === 0) {
      setValidationError(`Lightning Address can't be empty.`)
      return false
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
    if (!validationError && !evaluationError) {
      await createWallet({
        variables: { input: getCreateWalletInput() },
        onError() {
          setMutationError(
            'We could not save this as your Lightning Address, please try again later',
          )
        },
      })
    }
  }, [createWallet, evaluationError, validationError, getCreateWalletInput])

  return {
    evaluationState,
    error: validationError || evaluationError || mutationError || null,
    lightningAddress,
    setLightningAddress,
    validate,
    evaluate,
    mutate,
    loading,
  }
}
