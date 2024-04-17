import { useEffect, useState } from 'react'

import { useNotification } from '../../../../../../../../../../../utils'
import { getTransactionFromSwap } from './useTransactionStatusUpdate'

export const useGetTransactionId = (swapId: string) => {
  const [transaction, setTransaction] = useState<string>('')
  const { toast } = useNotification()

  useEffect(() => {
    if (swapId) {
      try {
        const getTransaction = async () => {
          const transactionId = await getTransactionFromSwap(swapId)
          console.log('checking transaction id', transactionId)
          setTransaction(transactionId || '')
        }

        getTransaction()
      } catch (e) {
        toast({
          title: 'Error',
          description: 'An error occurred while fetching the transaction',
          status: 'error',
        })
      }
    }
  }, [swapId, toast])

  return transaction
}
