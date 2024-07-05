import { useFundingContext } from '@/modules/project/context'
import { ProjectRewardFragment } from '@/types'
import { toInt, useNotification } from '@/utils'

import { RewardCard } from './components/RewardCard'

export const RenderRewards = ({ rewards }: { rewards: ProjectRewardFragment[] }) => {
  const { toast } = useNotification()

  const {
    fundForm: { state: fundFormState, setState: setFundingFormState, updateReward },
  } = useFundingContext()

  if (!rewards.length) {
    return null
  }

  return (
    <>
      {rewards.map((reward) => {
        // This is the number of items that is selected
        const count = (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0

        return (
          <RewardCard
            key={reward.id}
            width="100%"
            reward={reward}
            count={0}
            onRewardClick={() => {
              if (reward.maxClaimable && reward.maxClaimable - reward.sold <= count) {
                toast({
                  title: 'Reward Limit',
                  description: `Maximum number of ${reward.maxClaimable - reward.sold} rewards are available`,
                  status: 'error',
                })
                return
              }

              updateReward({ id: toInt(reward.id), count: count + 1 })
              setFundingFormState('step', 'contribution')
            }}
          />
        )
      })}
    </>
  )
}
