import { useAtomValue, useSetAtom } from 'jotai'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { addSwapAtom, currentSwapAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { getPath } from '@/shared/constants'

import { onChainErrorAtom, OnChainErrorStatuses } from '../states/onChainErrror.ts'
import { swapTransactionAtom } from '../states/onChainTransaction'
import { extractValuesFromError } from '../utils/parseError'
import { SwapStatusUpdate, useTransactionStatusUpdate } from './useTransactionStatusUpdate'

export const useListenOnchainTransactionUpdate = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { project } = useFundingFormAtom()

  const refundFile = useAtomValue(currentSwapAtom)

  const addRefundFile = useSetAtom(addSwapAtom)

  const setOnChainError = useSetAtom(onChainErrorAtom)

  const setSwapTransaction = useSetAtom(swapTransactionAtom)

  const handleProcessing = (value: SwapStatusUpdate) => {
    const { transaction } = value

    if (transaction) {
      setSwapTransaction(transaction)
    }

    navigate({ pathname: getPath('fundingAwaitingSuccess', project.name), search: location.search })
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

    navigate({ pathname: getPath('fundingPaymentOnchainRefund', project.name), search: location.search })
  }

  useTransactionStatusUpdate({
    handleProcessing,
    handleFailed,
    swapId: refundFile?.id,
  })
}
