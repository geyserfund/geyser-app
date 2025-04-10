import { useCallback, useState } from 'react'

import { SwapData, useRefundedSwapData, useRemoveRefundFile } from '@/modules/project/funding/state'
import { useNotification } from '@/utils'

import { BoltzTransaction, getTransactionFromSwap } from '../refund/api'
import { refund } from '../refund/refund'

const BAD_REFUND_FILE_ERROR = 'This refund file is not associated with any failed funding transaction'

export const useRefund = () => {
  const toast = useNotification()

  const [_, setRefundedSwapData] = useRefundedSwapData()
  const removeRefundFile = useRemoveRefundFile()

  const [loading, setLoading] = useState(false)

  const initiateRefund = useCallback(
    async (refundAddress: string, refundFile?: SwapData) => {
      if (!refundFile) {
        return false
      }

      try {
        setLoading(true)

        const transaction: BoltzTransaction & { error?: string } = await getTransactionFromSwap(refundFile.id)
        if (transaction.error) {
          toast.error({
            title: 'Refund failed',
            description: BAD_REFUND_FILE_ERROR,
          })
          removeRefundFile(refundFile.id)
          setLoading(false)
          return false
        }

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

  return { initiateRefund, loading }
}
