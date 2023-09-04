import { ApolloError } from '@apollo/client'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { RejectionError, WebLNProvider } from 'webln'

import {
  ApolloErrors,
  fundingStages,
  IFundingStages,
  stageList,
} from '../../constants'
import { AuthContext } from '../../context'
import {
  FundingInput,
  FundingMutationResponse,
  FundingStatus,
  FundingTxFragment,
  FundingTxWithInvoiceStatusFragment,
  InvoiceStatus,
  useFundingTxWithInvoiceStatusLazyQuery,
  useFundMutation,
  useRefreshFundingInvoiceMutation,
} from '../../types'
import { sha256, toInt, useNotification } from '../../utils'
import { useFundSubscription } from './useFundSubscription'

export type UseFundingFlowReturn = ReturnType<typeof useFundingFlow>

const initialAmounts = {
  total: 0,
  donationAmount: 0,
  shippingCost: 0,
  rewardsCost: 0,
}

const initialFunding: FundingTxFragment = {
  id: 0,
  uuid: '',
  invoiceId: '',
  status: FundingStatus.Unpaid,
  invoiceStatus: InvoiceStatus.Unpaid,
  amount: 0,
  projectId: '',
  paymentRequest: '',
  address: '',
  comment: '',
  media: '',
  paidAt: '',
  onChain: false,
  source: '',
  funder: {
    id: 0,
    user: {
      id: 0,
      username: '',
    },
  },
}

const WEBLN_ENABLE_ERROR = 'Failed to enable webln'

const POLLING_INTERVAL = 5 * 1000 // 5 seconds

interface IFundingFlowOptions {
  hasBolt11?: boolean
  hasWebLN?: boolean
}

const { webln }: { webln: WebLNProvider } = window as any

const requestWebLNPayment = async (fundingTx: FundingTxFragment) => {
  if (!webln) {
    throw new Error('no provider')
  }

  try {
    await webln.enable()
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  if (!fundingTx.paymentRequest) {
    throw new Error('payment request not found')
  }

  let preimage = ''

  try {
    const res = await webln.sendPayment(fundingTx.paymentRequest)
    preimage = res.preimage
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  return sha256(preimage)
}

export const useFundingFlow = (options?: IFundingFlowOptions) => {
  const { hasBolt11 = true, hasWebLN = true } = options || {
    hasBolt11: true,
    hasWebLN: true,
  }

  const { user } = useContext(AuthContext)
  const { toast } = useNotification()

  const [fundState, setFundState] = useState<IFundingStages>(
    fundingStages.initial,
  )
  const [error, setError] = useState('')

  const [fundingRequestErrored, setFundingRequestErrored] = useState(false)
  const [invoiceRefreshErrored, setInvoiceRefreshErrored] = useState(false)
  const [weblnErrored, setWebLNErrored] = useState(false)

  const [invoiceRefreshLoading, setRefreshingInvoice] = useState(false)

  const [fundingInput, setFundingInput] = useState<FundingInput | null>(null)
  const [fundingTx, setFundingTx] = useState<FundingTxFragment>({
    ...initialFunding,
    funder: { ...initialFunding.funder, user },
  })

  const { startListening, stopListening } = useFundSubscription({
    projectId: fundingTx.projectId,
    fundingTxId: fundingTx.id,
    onComplete(fundingTx) {
      handleFundingStatusCheck(fundingTx)
    },
  })
  const [amounts, setAmounts] =
    useState<FundingMutationResponse['amountSummary']>(initialAmounts)
  const fundIntervalRef = useRef<number>(0)
  useEffect(() => {
    const interval = fundIntervalRef.current
    return () => {
      stopListening()
      clearInterval(interval)
    }
  }, [stopListening])

  const [getFundingStatus] = useFundingTxWithInvoiceStatusLazyQuery({
    variables: {
      fundingTxID: toInt(fundingTx.id),
    },
    onCompleted(data) {
      if (data && data.fundingTx) {
        handleFundingStatusCheck(data.fundingTx)
      }
    },
    fetchPolicy: 'network-only',
  })

  const gotoNextStage = useCallback(() => {
    setFundState((currentState) => {
      const currentIndex = stageList.indexOf(currentState)
      const nextState = stageList[currentIndex + 1]

      if (nextState) {
        return nextState
      }

      return currentState
    })
  }, [])

  const handleFundingStatusCheck = useCallback(
    (fundingTx: FundingTxWithInvoiceStatusFragment) => {
      /*
        We also check the invoiceIds are the same so that the useEffect does not try to update the funding status of an
        older invoice. This can happen due to sync delays between the funding status polling and the funding invoice update.
      */
      setFundingTx((current) => {
        if (
          (fundingTx.invoiceStatus !== current.invoiceStatus ||
            fundingTx.status !== current.status) &&
          fundingTx.invoiceId === current.invoiceId
        ) {
          if (
            fundingTx.status === FundingStatus.Paid ||
            (fundingTx.onChain && fundingTx.status === FundingStatus.Pending)
          ) {
            stopListening()
            clearInterval(fundIntervalRef.current)
            gotoNextStage()
          }

          return {
            ...current,
            ...fundingTx,
            paymentRequest: fundingTx.paymentRequest || current.paymentRequest,
            uuid: fundingTx.uuid || current.uuid,
          }
        }

        return current
      })
    },
    [stopListening, gotoNextStage],
  )

  const startWebLNFlow = useCallback(
    async (fundingTx: FundingTxFragment) => {
      if (weblnErrored) {
        return
      }

      try {
        const paymentHash = await requestWebLNPayment(fundingTx)

        // Check preimage
        if (paymentHash === fundingTx.invoiceId) {
          gotoNextStage()
          return true
        }

        throw new Error('wrong preimage')
      } catch (error: any) {
        if (error.message === 'no provider') {
          throw error
        }

        if (error.message === 'wrong preimage') {
          toast({
            title: 'Wrong payment preimage',
            description:
              'The payment preimage returned by the WebLN provider did not match the payment hash.',
            status: 'error',
          })
          return false
        }

        if (
          error.constructor === RejectionError ||
          error.message === 'User rejected'
        ) {
          toast({
            title: 'Requested operation declined',
            description: 'Please use the invoice instead.',
            status: 'info',
          })
          return false
        }

        if (error.message === WEBLN_ENABLE_ERROR) {
          return false
        }

        toast({
          title: 'Oops! Something went wrong with WebLN.',
          description: 'Please copy the invoice manually instead.',
          status: 'error',
        })

        return false
      }
    },
    [gotoNextStage, toast, weblnErrored],
  )

  const [fundProject, { loading: fundingRequestLoading }] = useFundMutation({
    onCompleted(data) {
      try {
        const intervalFactory = () => {
          clearInterval(fundIntervalRef.current)
          return setInterval(getFundingStatus, POLLING_INTERVAL)
        }

        setError('')
        setFundingRequestErrored(false)

        if (!data.fund || !data.fund.fundingTx) {
          throw new Error('Undefined funding tx')
        }

        setFundingTx(data.fund.fundingTx)
        setAmounts(data.fund.amountSummary)

        if (hasBolt11 && hasWebLN && webln) {
          startWebLNFlow(data.fund.fundingTx)
            .then((success) => {
              if (!success) {
                startListening()
                fundIntervalRef.current = intervalFactory()
                setWebLNErrored(true)
              }
            })
            .catch(() => {
              fundIntervalRef.current = intervalFactory()
              startListening()
              // setFundingRequestErrored(true)
            })
        } else {
          fundIntervalRef.current = intervalFactory()
          startListening()
        }
      } catch (e) {
        setFundingRequestErrored(true)
        stopListening()
        clearInterval(fundIntervalRef.current)
        toast({
          title: 'Something went wrong',
          description: 'Please refresh the page and try again',
          status: 'error',
        })
      }
    },
    onError(error: ApolloError) {
      if (
        error?.graphQLErrors[0] &&
        error?.graphQLErrors[0]?.extensions?.code ===
          ApolloErrors.BAD_USER_INPUT
      ) {
        setError(error?.graphQLErrors[0].message)
      }

      setFundingRequestErrored(true)
      stopListening()
      clearInterval(fundIntervalRef.current)
      toast({
        title: 'Something went wrong',
        description: 'Please refresh the page and try again',
        status: 'error',
      })
    },
  })

  useEffect(() => {
    if (
      fundState === fundingStages.completed ||
      fundState === fundingStages.canceled ||
      fundState
    ) {
      stopListening()
      clearInterval(fundIntervalRef.current)
    }
  }, [fundState, stopListening])

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

      gotoNextStage()
      setFundingInput(input)

      await fundProject({ variables: { input } })
    },
    [fundProject, gotoNextStage, toast],
  )

  const [refreshInvoice] = useRefreshFundingInvoiceMutation({
    variables: {
      fundingTxID: fundingTx.id,
    },
    onError(_) {
      setInvoiceRefreshErrored(true)
      stopListening()
      clearInterval(fundIntervalRef.current)
    },
  })

  const refreshFundingInvoice = useCallback(async () => {
    try {
      setFundingTx({
        ...fundingTx,
        invoiceStatus: InvoiceStatus.Unpaid,
      })
      /*
       We set this manually instead of using loading so that we ensure the funding tx values are updated before the 
       loading variable is changed 
      */
      setRefreshingInvoice(true)
      const { data } = await refreshInvoice()

      if (data) {
        setFundingTx({
          ...fundingTx,
          ...data.fundingInvoiceRefresh,
        })
        setRefreshingInvoice(false)
      }
    } catch (_) {
      //
    }
  }, [fundingTx, refreshInvoice])

  const resetFundingFlow = useCallback(() => {
    setFundState(fundingStages.initial)
    setFundingRequestErrored(false)
    setInvoiceRefreshErrored(false)
    setError('')
    setWebLNErrored(false)
    setFundingTx({
      ...initialFunding,
      funder: { ...initialFunding.funder, user },
    })
    setAmounts(initialAmounts)
  }, [user])

  const retryFundingFlow = useCallback(() => {
    if (!fundingInput) {
      return
    }

    resetFundingFlow()
    gotoNextStage()
    requestFunding(fundingInput)
  }, [fundingInput, gotoNextStage, requestFunding, resetFundingFlow])

  return {
    fundingRequestErrored,
    fundingRequestLoading,
    invoiceRefreshErrored,
    invoiceRefreshLoading,
    weblnErrored,
    fundState,
    amounts,
    fundingTx,
    retryFundingFlow,
    gotoNextStage,
    resetFundingFlow,
    requestFunding,
    refreshFundingInvoice,
    setFundState,
    error,
    hasWebLN: useMemo(() => hasWebLN && Boolean(webln), [hasWebLN]),
  }
}

export const validateFundingInput = (input: FundingInput) => {
  let isValid = false
  let error = 'cannot initiate funding without amount'

  if (
    (input.donationInput && toInt(input.donationInput.donationAmount) > 0) ||
    (input.rewardInput && toInt(input.rewardInput.rewardsCost) > 0)
  ) {
    isValid = true
    error = ''
  }

  return { isValid, error }
}
