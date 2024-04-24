import { useState } from 'react'

import { useNotification } from '../../../../../../../../../../../utils'
import { useRefundedSwapData, useRefundFileValue, useRemoveRefundFile } from '../../../../../../../../../funding/state'
import { getTransactionFromSwap } from '../refund/api'
import { refund } from '../refund/refund'
import { useSwapTransactionValue } from '../states/onChainTransaction'

export const useRefund = () => {
  const { toast } = useNotification()

  const swapTransaction = useSwapTransactionValue()
  const refundFile = useRefundFileValue()

  const [_, setRefundedSwapData] = useRefundedSwapData()
  const removeRefundSwapData = useRemoveRefundFile()

  const [loading, setLoading] = useState(false)

  const initiateRefund = async (refundAddress: string) => {
    if (!refundFile) {
      return false
    }

    let transaction = swapTransaction
    try {
      setLoading(true)
      if (!swapTransaction.hex) {
        transaction = await getTransactionFromSwap(refundFile.id)
      }

      const value = await refund(refundFile, refundAddress, transaction)

      if (value && value.refundTx) {
        setRefundedSwapData(value)
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

      removeRefundSwapData(refundFile.id)

      return false
    } catch (error) {
      setLoading(false)
      toast({
        status: 'error',
        title: 'Refund failed',
        description: `${error}`,
      })
      return false
    }
  }

  return { initiateRefund, loading }
}
