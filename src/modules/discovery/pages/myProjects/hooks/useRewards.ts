import { useState } from 'react'

import { useOrdersStatsGetQuery } from '@/types'
import { useNotification } from '@/utils'

export type Reward = {
  id: string
  name: string
  image: string | null
  count: number
}

export const useRewards = (projectId: string) => {
  const { toast } = useNotification()
  const [rewards, setRewards] = useState<Reward[]>([])
  const [totalRewardsCount, setTotalRewardsCount] = useState(0)

  const { loading, error } = useOrdersStatsGetQuery({
    variables: {
      input: {
        where: {
          projectId,
        },
      },
    },
    onCompleted(data) {
      setTotalRewardsCount(data.ordersStatsGet.projectRewards.count)
      setRewards(
        data.ordersStatsGet.projectRewardsGroupedByProjectRewardId.map((reward) => ({
          id: reward.projectReward.id,
          name: reward.projectReward.name,
          image: reward.projectReward.image ?? null,
          count: reward.count,
        })),
      )
    },
    onError(error) {
      toast({
        status: 'error',
        title: 'Failed to fetch project rewards',
        description: `${error.message}`,
      })
    },
  })

  return {
    rewards,
    totalRewardsCount,
    isLoading: loading,
    error,
  }
}
