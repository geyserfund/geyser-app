import { ApolloError } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { ContributionCreateInput, ContributionCreateMutation, useContributionCreateMutation } from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useCustomMutation } from '../../API/custom/useCustomMutation'
import { fundingFlowErrorAtom, fundingRequestErrorAtom, useParseResponseToSwapAtom, useSetKeyPairAtom } from '../state'
import { fundingContributionPartialUpdateAtom } from '../state/fundingContributionAtom.ts'
import {
  formattedFundingInputAtom,
  setFundingInputAfterRequestAtom,
} from '../state/fundingContributionCreateInputAtom.ts'
import { fundingPaymentDetailsPartialUpdateAtom } from '../state/fundingPaymentAtom.ts'
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

  const fundingContributionPartialUpdate = useSetAtom(fundingContributionPartialUpdateAtom)
  const fundingPaymentDetailsPartialUpdate = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)

  const parseResponseToSwap = useParseResponseToSwapAtom()

  const startWebLNFlow = useWebLNFlow()

  const setKeyPair = useSetKeyPairAtom()

  const [contributionCreate, requestFundingOptions] = useCustomMutation(useContributionCreateMutation, {
    onCompleted(data) {
      try {
        setError(undefined)
        setFundingRequestErrored(false)

        if (!data.contributionCreate || !data.contributionCreate.contribution) {
          throw new Error('Undefined funding tx')
        }

        fundingContributionPartialUpdate(data.contributionCreate.contribution)
        fundingPaymentDetailsPartialUpdate(data.contributionCreate.payments)

        if (data.contributionCreate.payments.onChainSwap?.swapJson) {
          parseResponseToSwap(data.contributionCreate.payments.onChainSwap, {
            projectTitle: project?.title,
            reference: data.contributionCreate.contribution.uuid,
            bitcoinQuote: data.contributionCreate.contribution.bitcoinQuote,
            datetime: data.contributionCreate.contribution.createdAt,
          })
        }

        if (
          hasBolt11 &&
          hasWebLN &&
          webln &&
          data.contributionCreate.payments.lightning &&
          !data.contributionCreate.contribution.isSubscription
        ) {
          startWebLNFlow(data.contributionCreate.payments.lightning).catch(() => {
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
    async (input: ContributionCreateInput, onCompleted?: (data: ContributionCreateMutation) => void) => {
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

      if (input?.paymentsInput?.onChainSwap?.boltz) {
        input.paymentsInput.onChainSwap.boltz.swapPublicKey = keyPair.publicKey.toString('hex')
      }

      setFundingInputAfterRequest(input)

      await contributionCreate({ variables: { input }, onCompleted })
    },
    [contributionCreate, toast, setKeyPair, setFundingInputAfterRequest],
  )

  const requestFundingFromContext = useCallback(
    (onCompleted?: (data: ContributionCreateMutation) => void) => requestFunding(formattedFundingInput, onCompleted),
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
  }
}
