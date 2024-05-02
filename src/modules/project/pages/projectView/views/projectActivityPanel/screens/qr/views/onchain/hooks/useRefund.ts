import { useState } from 'react'

import { useNotification } from '../../../../../../../../../../../utils'
import { useRefundedSwapData, useRefundFileValue, useRemoveRefundFile } from '../../../../../../../../../funding/state'
import { BoltzTransaction, getTransactionFromSwap } from '../refund/api'
import { refund } from '../refund/refund'
import { useSwapTransactionValue } from '../states/onChainTransaction'

const BAD_REFUND_FILE_ERROR = 'This refund file is not associated with any failed funding transaction'

export const useRefund = () => {
  const { toast } = useNotification()

  const swapTransaction = useSwapTransactionValue()
  const refundFile = useRefundFileValue()

  const [_, setRefundedSwapData] = useRefundedSwapData()
  const removeRefundFile = useRemoveRefundFile()

  const [loading, setLoading] = useState(false)

  const initiateRefund = async (refundAddress: string) => {
    if (!refundFile) {
      return false
    }

    let transaction = swapTransaction as BoltzTransaction & { error?: string }
    try {
      setLoading(true)
      if (!swapTransaction.hex) {
        transaction = await getTransactionFromSwap(refundFile.id)
        if (transaction.error) {
          toast({
            status: 'error',
            title: 'Refund failed',
            description: BAD_REFUND_FILE_ERROR,
          })
          removeRefundFile(refundFile.id)
          setLoading(false)
          return false
        }
      }

      const value = await refund(refundFile, refundAddress, transaction)

      if (value && value.refundTx) {
        setRefundedSwapData(value)
        removeRefundFile(refundFile.id)
        return true
      }

      setLoading(false)
      if (value.error) {
        toast({
          status: 'error',
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
      toast({
        status: 'error',
        title: 'Refund failed',
        description: toastMessage,
      })
      return false
    }
  }

  return { initiateRefund, loading }
}
