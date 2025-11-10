import { useSetAtom } from 'jotai'
import { useCallback, useState } from 'react'

import { refundedSwapDataAtom, SwapData, useRemoveRefundFile } from '@/modules/project/funding/state'
import { useNotification } from '@/utils'

import { BoltzTransaction, getTransactionFromChainSwap, getTransactionFromSwap } from '../refund/api'
import { getRefundTransaction, refund } from '../refund/refund'

const BAD_REFUND_FILE_ERROR = 'This refund file is not associated with any failed funding transaction'

export const useRefund = () => {
  const toast = useNotification()

  const setRefundedSwapData = useSetAtom(refundedSwapDataAtom)
  const removeRefundFile = useRemoveRefundFile()

  const [loading, setLoading] = useState(false)

  const getSwapTransaction = useCallback(
    async (refundFile: SwapData, label: 'userLock' | 'serverLock' = 'userLock') => {
      let transaction: BoltzTransaction & { error?: string }

      if (refundFile.version === 3 || refundFile?.bip21?.includes('lightning')) {
        transaction = await getTransactionFromSwap(refundFile.id)
      } else {
        transaction = await getTransactionFromChainSwap(refundFile.id, label)
      }

      if (transaction.error) {
        removeRefundFile(refundFile.id)
        setLoading(false)
        throw new Error(BAD_REFUND_FILE_ERROR)
      }

      console.log('transaction', transaction)
      return transaction
    },
    [removeRefundFile],
  )

  const initiateRefund = useCallback(
    async (refundAddress: string, refundFile?: SwapData, label: 'userLock' | 'serverLock' = 'userLock') => {
      if (!refundFile) {
        return false
      }

      try {
        setLoading(true)

        const transaction = await getSwapTransaction(refundFile, label)

        const value = await refund(refundFile, refundAddress, transaction)

        if (value && value.refundTx) {
          setRefundedSwapData(value)
          removeRefundFile(refundFile.id)
          return true
        }

        setLoading(false)
        if (value.error) {
          toast.error({
            title: 'Refund failed',
            description: `${value.error}`,
          })
        }

        return false
      } catch (error: any) {
        let toastMessage = error.message
        if (error.message === 'swap not eligible for a cooperative refund') {
          removeRefundFile(refundFile.id)
          toastMessage = BAD_REFUND_FILE_ERROR
        }

        setLoading(false)
        toast.error({
          title: 'Refund failed',
          description: toastMessage,
        })
        return false
      }
    },
    [removeRefundFile, setRefundedSwapData, toast],
  )

  const initiateRefundToGetRefundTx = useCallback(
    async (refundAddress: string, refundFile?: SwapData, label: 'userLock' | 'serverLock' = 'userLock') => {
      if (!refundFile) {
        return false
      }

      try {
        setLoading(true)

        const transaction = await getSwapTransaction(refundFile, label)

        const refundTransactionHex = await getRefundTransaction(refundFile, refundAddress, transaction)

        setLoading(false)

        return refundTransactionHex
      } catch (error: any) {
        let toastMessage = error.message
        if (error.message === 'swap not eligible for a cooperative refund') {
          removeRefundFile(refundFile.id)
          toastMessage = BAD_REFUND_FILE_ERROR
        }

        setLoading(false)
        toast.error({
          title: 'Refund failed',
          description: toastMessage,
        })
        return false
      }
    },
    [getSwapTransaction, removeRefundFile],
  )

  return { initiateRefund, initiateRefundToGetRefundTx, loading }
}
