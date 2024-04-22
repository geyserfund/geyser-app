import { useState } from 'react'

import { useRefundFileValue } from '../../../../../../../../../funding/state'
import { getTransactionFromSwap } from '../refund/api'
import { refund } from '../refund/refund'
import { useRefundTransactionId, useSwapTransactionValue } from '../states/onChainTransaction'

export const useRefund = () => {
  const swapTransaction = useSwapTransactionValue()
  const refundFile = useRefundFileValue()

  const [_, setRefundTransactionId] = useRefundTransactionId()

  const [loading, setLoading] = useState(false)

  const initiateRefund = async (refundAddress: string) => {
    let transaction = swapTransaction
    console.log('chekcing swapTransaction in useRefund:', swapTransaction)
    try {
      setLoading(true)
      if (!swapTransaction.hex) {
        transaction = await getTransactionFromSwap(refundFile.id)
      }

      const value = await refund(refundFile, refundAddress, transaction)
      console.log('chekcing refund in useRefund:', value)

      if (value && value.refundTx) {
        setRefundTransactionId(value.refundTx)
        return true
      }

      setLoading(false)
      return false
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  return { initiateRefund, loading }
}
