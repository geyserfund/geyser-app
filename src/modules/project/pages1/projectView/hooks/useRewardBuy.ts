import { useCallback, useMemo } from 'react'

import { useFundingContext } from '@/modules/project/context'
import { ProjectRewardFragment } from '@/types'
import { toInt, useNotification } from '@/utils'

export const useRewardBuy = (reward?: Pick<ProjectRewardFragment, 'id' | 'maxClaimable' | 'sold'>) => {
  const toast = useNotification()
  const {
    fundForm: { state: fundFormState, setState: setFundingFormState, updateReward },
  } = useFundingContext()

  const count = useMemo(() => {
    if (!reward) return 0

    return (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0
  }, [fundFormState.rewardsByIDAndCount, reward])

  const buyReward = useCallback(() => {
    if (!reward) {
      toast.error({
        title: 'Reward purchase fail',
        description: `Please refresh the page and try again`,
      })
      return
    }

    const count = (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0

    if (reward.maxClaimable && reward.maxClaimable - reward.sold <= count) {
      toast.error({
        title: 'Reward Limit',
        description: `Maximum number of ${reward.maxClaimable - reward.sold} rewards are available`,
      })
      return
    }

    updateReward({ id: toInt(reward.id), count: count + 1 })
    setFundingFormState('step', 'contribution')
  }, [fundFormState.rewardsByIDAndCount, setFundingFormState, toast, updateReward, reward])

  return { count, buyReward }
}
