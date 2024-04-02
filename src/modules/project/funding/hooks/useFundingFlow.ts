import { ApolloError } from '@apollo/client'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { ApolloErrors, fundingStages } from '../../../../constants'
import { FundingInput, useFundingTxWithInvoiceStatusLazyQuery, useFundMutation } from '../../../../types'
import { toInt, useNotification } from '../../../../utils'
import { validateFundingInput } from '../../utils/helpers'
import { webln } from '../../utils/requestWebLNPayment'
import { fundingFlowErrorAtom, fundingRequestErrorAtom, weblnErrorAtom } from '../state/errorAtom'
import { useFundingStage } from '../state/fundingStagesAtom'
import { useCheckFundingStatus, useFundingTx } from '../state/fundingTxAtom'
import { useFundPollingAndSubscription } from '../state/pollingFundingTx'
import { useFundSubscription } from './useFundSubscription'
import { useResetFundingFlow } from './useResetFundingFlow'
import { useWebLNFlow } from './useWebLNFlow'

export enum ConfirmationMethod {
  Subscription = 'subscription',
  Polling = 'polling',
}

export type UseFundingFlowReturn = ReturnType<typeof useFundingFlow>

interface IFundingFlowOptions {
  hasBolt11?: boolean
  hasWebLN?: boolean
}

export const useFundingFlow = (options?: IFundingFlowOptions) => {
  const { hasBolt11 = true, hasWebLN = true } = options || {
    hasBolt11: true,
    hasWebLN: true,
  }

  const { toast } = useNotification()

  const { fundingStage, setNextFundingStage } = useFundingStage()
  const startWebLNFlow = useWebLNFlow()
  const resetFundingFlow = useResetFundingFlow()

  const [error, setError] = useAtom(fundingFlowErrorAtom)
  const [fundingRequestErrored, setFundingRequestErrored] = useAtom(fundingRequestErrorAtom)

  const [weblnErrored] = useAtom(weblnErrorAtom)

  const [fundingInput, setFundingInput] = useState<FundingInput | null>(null)

  const { fundingTx, updateFundingTx } = useFundingTx()

  const { pollingFundingTx, startPollingAndSubscription, clearPollingAndSubscription } = useFundPollingAndSubscription()

  useFundSubscription({
    projectId: fundingTx.projectId,
    fundingTxId: fundingTx.id,
    onComplete() {
      getFundingStatus()
    },
  })

  const checkFundingStatus = useCheckFundingStatus()

  const [getFundingStatus] = useFundingTxWithInvoiceStatusLazyQuery({
    variables: {
      fundingTxID: toInt(fundingTx.id),
    },
    onCompleted(data) {
      if (data && data.fundingTx) {
        checkFundingStatus(data.fundingTx, ConfirmationMethod.Polling)
      }
    },
    pollInterval: pollingFundingTx,
    fetchPolicy: 'network-only',
  })

  const [fundProject, { loading: fundingRequestLoading }] = useFundMutation({
    onCompleted(data) {
      try {
        setError('')
        setFundingRequestErrored(false)

        if (!data.fund || !data.fund.fundingTx) {
          throw new Error('Undefined funding tx')
        }

        updateFundingTx(data.fund.fundingTx)

        if (hasBolt11 && hasWebLN && webln) {
          startWebLNFlow(data.fund.fundingTx)
            .then((success) => {
              if (!success) {
                startPollingAndSubscription()
              }
            })
            .catch(() => {
              startPollingAndSubscription()
            })
        } else {
          startPollingAndSubscription()
        }
      } catch (e) {
        setFundingRequestErrored(true)
        clearPollingAndSubscription()
        toast({
          title: 'Something went wrong',
          description: 'Please refresh the page and try again',
          status: 'error',
        })
      }
    },
    onError(error: ApolloError) {
      if (error?.graphQLErrors[0] && error?.graphQLErrors[0]?.extensions?.code === ApolloErrors.BAD_USER_INPUT) {
        setError(error?.graphQLErrors[0].message)
      }

      setFundingRequestErrored(true)
      clearPollingAndSubscription()

      toast({
        title: 'Something went wrong',
        description: 'Please refresh the page and try again',
        status: 'error',
      })
    },
  })

  useEffect(() => {
    if (fundingStage === fundingStages.completed || fundingStage === fundingStages.canceled) {
      clearPollingAndSubscription()
    }
  }, [fundingStage, clearPollingAndSubscription])

  const requestFunding = useCallback(
    async (input: FundingInput) => {
      const { isValid, error } = validateFundingInput(input)

      if (!isValid) {
        toast({
          status: 'error',
          title: 'failed to generate invoice',
          description: error,
        })
        return
      }

      setNextFundingStage()
      setFundingInput(input)

      await fundProject({ variables: { input } })
    },
    [fundProject, setNextFundingStage, toast],
  )

  const retryFundingFlow = useCallback(() => {
    if (!fundingInput) {
      return
    }

    resetFundingFlow()
    setNextFundingStage()
    requestFunding(fundingInput)
  }, [fundingInput, setNextFundingStage, requestFunding, resetFundingFlow])

  return {
    fundingRequestErrored,
    fundingRequestLoading,
    requestFunding,
    retryFundingFlow,
    resetFundingFlow,

    fundingTx,

    error,
    weblnErrored,

    hasWebLN: useMemo(() => hasWebLN && Boolean(webln), [hasWebLN]),
  }
}
