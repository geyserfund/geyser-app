import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { getPath } from '@/shared/constants'
import { ProjectRewardFragment } from '@/types'
import { toInt, useNotification } from '@/utils'

export const useRewardBuy = (reward?: Pick<ProjectRewardFragment, 'id' | 'maxClaimable' | 'sold'>) => {
  const toast = useNotification()

  const { formState, updateReward, project } = useFundingFormAtom()

  const navigate = useNavigate()

  /** Current count of the number of rewards selected */
  const count = useMemo(() => {
    if (!reward) return 0

    return (formState.rewardsByIDAndCount && formState.rewardsByIDAndCount[`${reward.id}`]) || 0
  }, [formState.rewardsByIDAndCount, reward])

  /** Checks if the reward is available to buy */
  const isAvailable = useMemo(() => {
    if (!reward) return true

    return reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true
  }, [reward, count])

  const addRewardAction = useCallback(
    (onCompleted?: Function) => {
      if (!reward) {
        toast.error({
          title: 'Reward purchase fail',
          description: `Please refresh the page and try again`,
        })
        return
      }

      const count = (formState.rewardsByIDAndCount && formState.rewardsByIDAndCount[`${reward.id}`]) || 0

      if (isAvailable || !reward.maxClaimable) {
        updateReward({ id: toInt(reward.id), count: count + 1 })
        if (onCompleted) {
          onCompleted()
        }
      } else {
        toast.error({
          title: 'Reward Limit',
          description: `Maximum number of ${reward.maxClaimable - reward.sold} rewards are available`,
        })
      }
    },
    [formState.rewardsByIDAndCount, toast, updateReward, reward, isAvailable],
  )

  /** Adds reward item to the funding basket */
  const addRewardToBasket = useCallback(() => {
    addRewardAction()
  }, [addRewardAction])

  /** Adds reward to basket and redirects to funding flow */
  const buyReward = useCallback(() => {
    addRewardAction(() => {
      if (project?.name) {
        navigate(getPath('projectFunding', project?.name))
      }
    })
  }, [addRewardAction, navigate, project?.name])

  /** Removes the reward from the funding basket */
  const removeRewardFromBasket = useCallback(() => {
    if (count > 0) {
      updateReward({ id: reward?.id, count: count - 1 })
    }
  }, [count, updateReward, reward])

  return { count, isAvailable, buyReward, addRewardToBasket, removeRewardFromBasket }
}
