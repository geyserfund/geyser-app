import { useEffect, useMemo, useState } from 'react'
import type { Address, Hex } from 'viem'

import { projectIdToProjectKey } from '@/modules/project/funding/utils/projectKey.ts'
import { rootstockPublicClient } from '@/modules/project/pages/projectFunding/utils/viemClient.ts'
import { VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS } from '@/shared/constants/config/env.ts'

const prismWithdrawableAbi = [
  {
    name: 'withdrawable',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'receiver', type: 'address' },
      { name: 'projectKey', type: 'bytes32' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const

type UsePrismWithdrawableParams = {
  projectId?: number | string | bigint
  receiver?: string
}

export const usePrismWithdrawable = ({ projectId, receiver }: UsePrismWithdrawableParams) => {
  const [withdrawable, setWithdrawable] = useState<bigint | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const projectKey = useMemo(() => {
    if (projectId === undefined || projectId === null) return null
    try {
      return projectIdToProjectKey(BigInt(projectId))
    } catch (err) {
      return null
    }
  }, [projectId])

  useEffect(() => {
    const contractAddress = VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS?.trim()
    if (!receiver || !projectKey || !contractAddress) {
      setWithdrawable(null)
      return
    }

    let isMounted = true
    setIsLoading(true)
    setError(null)

    rootstockPublicClient
      .readContract({
        address: contractAddress as Address,
        abi: prismWithdrawableAbi,
        functionName: 'withdrawable',
        args: [receiver as Address, projectKey as Hex],
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
  }, [projectKey, receiver])

  return { withdrawable, isLoading, error }
}
