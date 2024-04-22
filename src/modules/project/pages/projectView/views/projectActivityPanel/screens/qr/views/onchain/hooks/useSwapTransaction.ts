import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { useNotification } from '../../../../../../../../../../../utils'
import { useRefundFileValue } from '../../../../../../../../../funding/state'
import { getTransactionFromSwap } from '../refund/api'
import { swapTransactionAtom } from '../states/onChainTransaction'

export const useSwapTransaction = () => {
  const { toast } = useNotification()
  const { id } = useRefundFileValue()

  const [swapTransaction, setSwapTransaction] = useAtom(swapTransactionAtom)

  useEffect(() => {
    const fetchTransaction = async (id: string) => {
      try {
        const transaction = await getTransactionFromSwap(id)
        setSwapTransaction(transaction)
      } catch (error) {
        toast({
          status: 'error',
          title: 'Failed to fetch swap transaction',
        })
      }
    }

    if (id) {
      fetchTransaction(id)
    }
  }, [id])

  return swapTransaction
}
