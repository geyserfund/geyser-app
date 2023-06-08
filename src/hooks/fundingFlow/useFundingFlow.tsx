import { ApolloError, useQuery } from '@apollo/client'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { RejectionError, WebLNProvider } from 'webln'

import { ApolloErrors, fundingStages, stageList } from '../../constants'
import { IFundingStages } from '../../constants'
import { AuthContext } from '../../context'
import {
  FundingInput,
  FundingMutationResponse,
  FundingStatus,
  FundingTxFragment,
  InvoiceStatus,
  useFundingTxWithInvoiceStatusLazyQuery,
  useFundMutation,
  useGetFundingTxLazyQuery,
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

  const paymentHash = await sha256(preimage)
  return paymentHash
}

export const useFundingFlow = (options?: IFundingFlowOptions) => {
  const fundIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Cleanup interval on unmount
    return () => clearInterval(fundIntervalRef.current)
  }, [])

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

  const { startListening } = useFundSubscription({
    projectId: fundingTx.projectId,
  })

  const [amounts, setAmounts] =
    useState<FundingMutationResponse['amountSummary']>(initialAmounts)

  const [getFundingStatus, { data: fundingStatus }] =
    useFundingTxWithInvoiceStatusLazyQuery({
      variables: {
        fundingTxID: toInt(fundingTx.id),
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
          return setInterval(getFundingStatus, 1500)
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
                fundIntervalRef.current = intervalFactory()
                startListening(data.fund.fundingTx?.id)
                setWebLNErrored(true)
              }
            })
            .catch(() => {
              fundIntervalRef.current = intervalFactory()
              startListening(data.fund.fundingTx?.id)
              setFundingRequestErrored(true)
            })
        } else {
          startListening(data.fund.fundingTx?.id)
          fundIntervalRef.current = intervalFactory()
        }
      } catch (e) {
        setFundingRequestErrored(true)
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
      clearInterval(fundIntervalRef.current)
      toast({
        title: 'Something went wrong',
        description: 'Please refresh the page and try again',
        status: 'error',
      })
    },
  })

  useEffect(() => {
    if (fundingStatus && fundingStatus.fundingTx) {
      /*
        We also check the invoiceIds are the same so that the useEffect does not try to update the funding status of an
        older invoice. This can happen due to sync delays between the funding status polling and the funding invoice update.
      */
      setFundingTx((current) => {
        if (
          (fundingStatus.fundingTx.invoiceStatus !== current.invoiceStatus ||
            fundingStatus.fundingTx.status !== current.status) &&
          fundingStatus.fundingTx.invoiceId === current.invoiceId
        ) {
          return {
            ...current,
            ...fundingStatus.fundingTx,
          }
        }

        return current
      })

      if (
        fundingStatus.fundingTx.status === FundingStatus.Paid ||
        (fundingStatus.fundingTx.status === FundingStatus.Pending &&
          fundingStatus.fundingTx.onChain)
      ) {
        clearInterval(fundIntervalRef.current)
        gotoNextStage()
      }
    }
  }, [fundingStatus, gotoNextStage])

  useEffect(() => {
    if (
      fundState === fundingStages.completed ||
      fundState === fundingStages.canceled ||
      fundState
    ) {
      clearInterval(fundIntervalRef.current)
    }
  }, [fundState])

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

      // await fundProject({ variables: { input } })
      await getFundingTx()
    },
    [fundProject, gotoNextStage, toast],
  )

  const [getFundingTx] = useGetFundingTxLazyQuery({
    variables: {
      id: 185727,
    },
    onCompleted(data) {
      console.log('we are getting data', data)
      setFundingTx(data.fundingTx)
      startListening(data.fundingTx?.id)
    },
  })

  const [refreshInvoice] = useRefreshFundingInvoiceMutation({
    variables: {
      fundingTxID: fundingTx.id,
    },
    onError(_) {
      setInvoiceRefreshErrored(true)
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
  let isValid = true
  let error = ''

  if (!input.donationInput?.donationAmount && !input.rewardInput?.rewardsCost) {
    isValid = false
    error = 'cannot initiate funding without amount'
  }

  return { isValid, error }
}
