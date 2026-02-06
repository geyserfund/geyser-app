import { useEffect, useState } from 'react'
import type { Address } from 'viem'

import { rootstockPublicClient } from '@/modules/project/pages/projectFunding/utils/viemClient.ts'

type UsePrismWithdrawableParams = {
  rskAddress?: string
}

export const usePrismWithdrawable = ({ rskAddress }: UsePrismWithdrawableParams) => {
  const [withdrawable, setWithdrawable] = useState<bigint | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!rskAddress) {
      setWithdrawable(null)
      return
    }

    let isMounted = true
    setIsLoading(true)
    setError(null)

    rootstockPublicClient
      .getBalance({
        address: rskAddress as Address,
      })
      .then((value) => {
        if (isMounted) {
          setWithdrawable(value as bigint)
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err)
          setWithdrawable(null)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [rskAddress])

  return { withdrawable, isLoading, error }
}
