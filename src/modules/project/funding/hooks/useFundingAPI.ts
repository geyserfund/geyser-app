import { ApolloError } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { __development__ } from '@/shared/constants/index.ts'
import { ContributionCreateInput, ContributionCreateMutation, useContributionCreateMutation } from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useCustomMutation } from '../../API/custom/useCustomMutation'
import { generateAccountKeys } from '../../pages1/projectCreation/views/launchPayment/views/launchPaymentAccountPassword/keyGenerationHelper.ts'
import { fundingFlowErrorAtom, fundingRequestErrorAtom, useParseResponseToSwapAtom } from '../state'
import { fundingContributionPartialUpdateAtom } from '../state/fundingContributionAtom.ts'
import {
  formattedFundingInputAtom,
  setFundingInputAfterRequestAtom,
} from '../state/fundingContributionCreateInputAtom.ts'
import { fundingPaymentDetailsPartialUpdateAtom } from '../state/fundingPaymentAtom.ts'
import { keyPairAtom } from '../state/swapAtom.ts'
import { rskAccountKeysAtom } from '../state/swapRskAtom.ts'
import { generatePrivatePublicKeyPair, validateFundingInput } from '../utils/helpers'
import { webln } from '../utils/requestWebLNPayment'
import { useFundingFormAtom } from './useFundingFormAtom'
import { useResetContribution } from './useResetContribution.ts'
import { useWebLNFlow } from './useWebLNFlow'

const hasBolt11 = true
const hasWebLN = true

export const useFundingAPI = () => {
  const toast = useNotification()

  const { project } = useFundingFormAtom()

  const formattedFundingInput = useAtomValue(formattedFundingInputAtom)

  const setFundingInputAfterRequest = useSetAtom(setFundingInputAfterRequestAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)

  const resetContribution = useResetContribution()

  const fundingContributionPartialUpdate = useSetAtom(fundingContributionPartialUpdateAtom)
  const fundingPaymentDetailsPartialUpdate = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)

  const parseResponseToSwap = useParseResponseToSwapAtom()

  const startWebLNFlow = useWebLNFlow()

  const setKeyPair = useSetAtom(keyPairAtom)
  const setRskAccountKeys = useSetAtom(rskAccountKeysAtom)

  const [contributionCreate, requestFundingOptions] = useCustomMutation(useContributionCreateMutation, {
    onCompleted(data) {
      try {
        if (!data.contributionCreate || !data.contributionCreate.contribution) {
          throw new Error('Undefined funding tx')
        }

        fundingContributionPartialUpdate(data.contributionCreate.contribution)
        fundingPaymentDetailsPartialUpdate({ ...data.contributionCreate.payments, fiatSwap: undefined })

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
          !data.contributionCreate.contribution.isSubscription &&
          !__development__
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

      resetContribution()

      const finalInput = { ...input }

      if (finalInput?.paymentsInput?.onChainSwap?.boltz) {
        const keyPair = generatePrivatePublicKeyPair()
        setKeyPair(keyPair)
        finalInput.paymentsInput.onChainSwap.boltz.swapPublicKey = keyPair.publicKey.toString('hex')
      }

      if (finalInput?.paymentsInput?.lightningToRskSwap?.boltz && finalInput.paymentsInput.onChainToRskSwap?.boltz) {
        const accountKeys = generateAccountKeys()
        setRskAccountKeys(accountKeys)
        finalInput.paymentsInput.lightningToRskSwap.boltz.claimPublicKey = accountKeys.publicKey
        finalInput.paymentsInput.onChainToRskSwap.boltz.claimPublicKey = accountKeys.publicKey
      }

      setFundingInputAfterRequest(finalInput)

      await contributionCreate({ variables: { input: finalInput }, onCompleted })
    },
    [contributionCreate, toast, setKeyPair, setFundingInputAfterRequest, resetContribution, setRskAccountKeys],
  )

  const requestFundingFromContext = useCallback(
    (onCompleted?: (data: ContributionCreateMutation) => void) => requestFunding(formattedFundingInput, onCompleted),
    [requestFunding, formattedFundingInput],
  )

  return {
    requestFundingOptions,
    requestFunding,
    requestFundingFromContext,
  }
}
