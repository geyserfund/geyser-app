import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useRefundFileAdd, useRefundFileValue } from '@/modules/project/funding/state'
import { getPath } from '@/shared/constants'

import { OnChainErrorStatuses, useSetOnChainErrorAtom } from '../states'
import { swapTransactionAtom } from '../states/onChainTransaction'
import { extractValuesFromError } from '../utils/parseError'
import { SwapStatusUpdate, useTransactionStatusUpdate } from './useTransactionStatusUpdate'

export const useListenOnchainTransactionUpdate = () => {
  const navigate = useNavigate()

  const { project } = useFundingFormAtom()

  const refundFile = useRefundFileValue()

  const addRefundFile = useRefundFileAdd()

  const setOnChainError = useSetOnChainErrorAtom()

  const setSwapTransaction = useSetAtom(swapTransactionAtom)

  const handleProcessing = (value: SwapStatusUpdate) => {
    const { transaction } = value

    if (transaction) {
      setSwapTransaction(transaction)
    }

    navigate(getPath('fundingPaymentOnchainProcessing', project.name))
  }

  const handleFailed = (value: SwapStatusUpdate) => {
    setOnChainError(value)

    if (value.status === OnChainErrorStatuses.LOCKUP_FAILED && refundFile) {
      const values = extractValuesFromError(value.failureReason || '')

      if (values.locked) {
        const newRefundFile = {
          ...refundFile,
          amount: values.locked,
        }
        addRefundFile(newRefundFile)
      }
    }

    navigate(getPath('fundingPaymentOnchainRefund', project.name))
  }

  useTransactionStatusUpdate({
    handleProcessing,
    handleFailed,
    swapId: refundFile?.id,
  })
}
