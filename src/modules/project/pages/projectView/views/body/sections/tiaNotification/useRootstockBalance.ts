import { useCallback, useEffect, useState } from 'react'
import type { Address } from 'viem'

import { rootstockPublicClient } from '@/modules/project/pages/projectFunding/utils/viemClient.ts'

type UseRootstockBalanceParams = {
  rskAddress?: string
}

export const useRootstockBalance = ({ rskAddress }: UseRootstockBalanceParams) => {
  const [balance, setBalance] = useState<bigint | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    if (!rskAddress) {
      setBalance(null)
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const value = await rootstockPublicClient.getBalance({ address: rskAddress as Address })
      setBalance(value)
      return value
    } catch (err) {
      setError(err as Error)
      setBalance(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [rskAddress])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { balance, isLoading, error, refetch }
}
