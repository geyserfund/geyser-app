import { ApolloError } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { FundingInput, useFundMutation } from '@/types'
import { useNotification } from '@/utils'

import { useCustomMutation } from '../../API/custom/useCustomMutation'
import { fundingFlowErrorAtom, fundingRequestErrorAtom, useParseResponseToSwapAtom, useSetKeyPairAtom } from '../state'
import { formattedFundingInputAtom, setFundingInputAfterRequestAtom } from '../state/fundingFormAtom'
import { useFundingTxAtom } from '../state/fundingTxAtom'
import { generatePrivatePublicKeyPair, validateFundingInput } from '../utils/helpers'
import { webln } from '../utils/requestWebLNPayment'
import { useFundingFormAtom } from './useFundingFormAtom'
import { useResetFundingFlow } from './useResetFundingFlow'
import { useWebLNFlow } from './useWebLNFlow'

const hasBolt11 = true
const hasWebLN = true

export const useFundingAPI = () => {
  const toast = useNotification()

  const resetFundingFlow = useResetFundingFlow()

  const { project, isFundingInputAmountValid, isFundingUserInfoValid } = useFundingFormAtom()

  const formattedFundingInput = useAtomValue(formattedFundingInputAtom)

  const setFundingInputAfterRequest = useSetAtom(setFundingInputAfterRequestAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)

  const { updateFundingTx } = useFundingTxAtom()

  const parseResponseToSwap = useParseResponseToSwapAtom()

  const startWebLNFlow = useWebLNFlow()

  const setKeyPair = useSetKeyPairAtom()

  const [fundProject, requestFundingOptions] = useCustomMutation(useFundMutation, {
    onCompleted(data) {
      try {
        setError(undefined)
        setFundingRequestErrored(false)

        if (!data.fund || !data.fund.fundingTx) {
          throw new Error('Undefined funding tx')
        }

        updateFundingTx(data.fund.fundingTx)
        if (data.fund?.swap?.json) {
          parseResponseToSwap(data.fund.swap, {
            projectTitle: project?.title,
            reference: data.fund.fundingTx.uuid,
            bitcoinQuote: data.fund.fundingTx.bitcoinQuote,
            datetime: data.fund.fundingTx.createdAt,
          })
        }

        if (hasBolt11 && hasWebLN && webln) {
          startWebLNFlow(data.fund.fundingTx).catch(() => {
            toast.error({
              title: 'Something went wrong',
              description: 'Please refresh the page and try again',
            })
          })
        }
      } catch (e) {
        setFundingRequestErrored(true)
        toast.error({
          title: 'Something went wrong',
          description: 'Please refresh the page and try again',
        })
      }
    },
    onError(error: ApolloError) {
      if (error?.graphQLErrors[0] && error?.graphQLErrors[0]?.extensions?.code) {
        setError(error?.graphQLErrors[0].extensions)
      }

      setFundingRequestErrored(true)

      toast.error({
        title: 'Something went wrong',
        description: 'Please refresh the page and try again',
      })
    },
  })

  const requestFunding = useCallback(
    async (input: FundingInput, onCompleted?: () => void) => {
      const { isValid, error } = validateFundingInput(input)

      if (!isValid) {
        toast.error({
          title: 'failed to generate invoice',
          description: error,
        })
        return
      }

      const keyPair = generatePrivatePublicKeyPair()
      setKeyPair(keyPair)

      input.swapPublicKey = keyPair.publicKey.toString('hex')

      setFundingInputAfterRequest(input)

      await fundProject({ variables: { input }, onCompleted })
    },
    [fundProject, toast, setKeyPair, setFundingInputAfterRequest],
  )

  const requestFundingFromContext = useCallback(
    (onCompleted?: () => void) => requestFunding(formattedFundingInput, onCompleted),
    [requestFunding, formattedFundingInput],
  )

  const retryFundingRequest = useCallback(() => {
    if (!isFundingInputAmountValid.valid || isFundingUserInfoValid.valid) {
      return
    }

    resetFundingFlow()
    requestFundingFromContext()
  }, [resetFundingFlow, requestFundingFromContext, isFundingInputAmountValid, isFundingUserInfoValid])

  return {
    requestFundingOptions,
    requestFunding,
    requestFundingFromContext,
    retryFundingRequest,
    // refetchFundingTx: refetch,
  }
}
