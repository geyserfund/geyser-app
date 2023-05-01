import { ApolloError, gql, useLazyQuery, useMutation } from '@apollo/client'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { RejectionError, WebLNProvider } from 'webln'

import { ApolloErrors, fundingStages, stageList } from '../constants'
import { IFundingStages } from '../constants'
import { AuthContext } from '../context'
import { MUTATION_FUND } from '../graphql'
import { IFundingAmounts } from '../interfaces'
import {
  FundingInput,
  FundingStatus,
  FundingTx,
  InvoiceStatus,
} from '../types/generated/graphql'
import { sha256, toInt, useNotification } from '../utils'

export type UseFundingFlowReturn = ReturnType<typeof useFundingFlow>

type FundingTXQueryResponseData = {
  fundingTx: FundingTx
}

type FundingTXQueryInput = {
  fundingTxID: number
}

type InvoiceRefreshMutationResponseData = {
  fundingInvoiceRefresh: FundingTx
}

type InvoiceRefreshMutationInput = {
  fundingTxID: number
}

const QUERY_GET_FUNDING_TX_STATUS_AND_INVOICE_STATUS = gql`
  query GetFundingTxStatusAndInvoiceStatus($fundingTxID: BigInt!) {
    fundingTx(id: $fundingTxID) {
      invoiceId
      status
      onChain
      invoiceStatus
    }
  }
`

const REFRESH_FUNDING_INVOICE = gql`
  mutation RefreshFundingInvoice($fundingTxID: BigInt!) {
    fundingInvoiceRefresh(fundingTxId: $fundingTxID) {
      id
      invoiceId
      invoiceStatus
      paymentRequest
    }
  }
`

const initialAmounts = {
  total: 0,
  donationAmount: 0,
  shippingCost: 0,
  rewardsCost: 0,
}

const initialFunding: FundingTx = {
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
    amountFunded: 0,
    timesFunded: 0,
    confirmed: false,
    confirmedAt: '',
    rewards: [],
    fundingTxs: [],
  },
}

const WEBLN_ENABLE_ERROR = 'Failed to enable webln'

let fundInterval: any

interface IFundingFlowOptions {
  hasBolt11?: boolean
  hasWebLN?: boolean
}

const { webln }: { webln: WebLNProvider } = window as any

const requestWebLNPayment = async (fundingTx: FundingTx) => {
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

  const { preimage } = await webln.sendPayment(fundingTx.paymentRequest)
  const paymentHash = await sha256(preimage)
  return paymentHash
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
  const [fundingTx, setFundingTx] = useState<FundingTx>({
    ...initialFunding,
    funder: { ...initialFunding.funder, user },
  })

  const [amounts, setAmounts] = useState<IFundingAmounts>(initialAmounts)

  const [getFundingStatus, { data: fundingStatus }] = useLazyQuery<
    FundingTXQueryResponseData,
    FundingTXQueryInput
  >(QUERY_GET_FUNDING_TX_STATUS_AND_INVOICE_STATUS, {
    variables: {
      fundingTxID: toInt(fundingTx.id),
    },
    fetchPolicy: 'network-only',
  })

  const gotoNextStage = useCallback(() => {
    setFundState((currentState) => {
      const currentIndex = stageList.indexOf(currentState)
      const nextState = stageList[currentIndex + 1]
      return nextState
    })
  }, [setFundState])

  const startWebLNFlow = useCallback(
    async (fundingTx: FundingTx) => {
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

  const [fundProject, { loading: fundingRequestLoading }] = useMutation(
    MUTATION_FUND,
    {
      onCompleted(data) {
        setError('')
        setFundingRequestErrored(false)
        try {
          setFundingTx(data.fund.fundingTx)
          setAmounts(data.fund.amountSummary)

          if (hasBolt11 && hasWebLN && webln) {
            startWebLNFlow(data.fund.fundingTx)
              .then((success) => {
                if (!success) {
                  fundInterval = setInterval(getFundingStatus, 1500)
                  setWebLNErrored(true)
                }
              })
              .catch(console.error)
          } else {
            fundInterval = setInterval(getFundingStatus, 1500)
          }
        } catch (_) {
          setFundingRequestErrored(true)
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
        clearInterval(fundInterval)
        toast({
          title: 'Something went wrong',
          description: 'Please refresh the page and try again',
          status: 'error',
        })
      },
    },
  )

  useEffect(() => {
    if (fundingStatus && fundingStatus.fundingTx) {
      /*
        We also check the invoiceIds are the same so that the useEffect does not try to update the funding status of an
        older invoice. This can happen due to sync delays between the funding status polling and the funding invoice update.
      */
      if (
        (fundingStatus.fundingTx.invoiceStatus !== fundingTx.invoiceStatus ||
          fundingStatus.fundingTx.status !== fundingTx.status) &&
        fundingStatus.fundingTx.invoiceId === fundingTx.invoiceId
      ) {
        setFundingTx({
          ...fundingTx,
          ...fundingStatus.fundingTx,
        })
      }

      if (
        fundingStatus.fundingTx.status === FundingStatus.Paid ||
        (fundingStatus.fundingTx.status === FundingStatus.Pending &&
          fundingTx.onChain)
      ) {
        clearInterval(fundInterval)
        gotoNextStage()
      }
    }
  }, [fundingStatus, fundingTx, gotoNextStage])

  useEffect(() => {
    if (
      fundState === fundingStages.completed ||
      fundState === fundingStages.canceled ||
      fundState
    ) {
      clearInterval(fundInterval)
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
      await fundProject({ variables: { input } })
    },
    [fundProject, gotoNextStage, toast],
  )

  const [refreshInvoice] = useMutation<
    InvoiceRefreshMutationResponseData,
    InvoiceRefreshMutationInput
  >(REFRESH_FUNDING_INVOICE, {
    variables: {
      fundingTxID: fundingTx.id,
    },
    onError(_) {
      setInvoiceRefreshErrored(true)
      clearInterval(fundInterval)
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
    hasWebLN: useMemo(() => hasWebLN && Boolean(webln), [hasWebLN, webln]),
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
