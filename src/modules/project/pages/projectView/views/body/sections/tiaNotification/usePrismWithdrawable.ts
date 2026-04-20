import { useCallback, useEffect, useState } from 'react'
import type { Address } from 'viem'

import { rootstockPublicClient } from '@/modules/project/pages/projectFunding/utils/viemClient.ts'

type UsePrismWithdrawableParams = {
  rskAddress?: string
}

export const usePrismWithdrawable = ({ rskAddress }: UsePrismWithdrawableParams) => {
  const [withdrawable, setWithdrawable] = useState<bigint | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    if (!rskAddress) {
      setWithdrawable(null)
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const value = await rootstockPublicClient.getBalance({
        address: rskAddress as Address,
      })
      setWithdrawable(value as bigint)
      return value as bigint
    } catch (err) {
      setError(err as Error)
      setWithdrawable(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [rskAddress])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { withdrawable, isLoading, error, refetch }
}
