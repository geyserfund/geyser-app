import { atom } from 'jotai'

import { ProjectRewardFragment } from '../../../types'

/** Rewards for the Project in context */
export const rewardsAtom = atom<ProjectRewardFragment[]>([])

/** add or update a reward */
export const addUpdateRewardsAtom = atom(null, (get, set, currentReward: ProjectRewardFragment) => {
  const allRewards = get(rewardsAtom)

  const isExist = allRewards.some((reward) => reward.id === currentReward.id)

  if (isExist) {
    set(rewardsAtom, (rewards) => {
      return rewards.map((reward) => {
        if (reward.id === currentReward.id) {
          return currentReward
        }

        return reward
      })
    })
  } else {
    set(rewardsAtom, (rewards) => {
      return [currentReward, ...rewards]
    })
  }
})

/** delete a reward */
export const deleteRewardAtom = atom(null, (get, set, rewardId: string) => {
  const allRewards = get(rewardsAtom)

  set(
    rewardsAtom,
    allRewards.filter((reward) => reward.id !== rewardId),
  )
})

/** Initial rewards load, set to false by default */
export const initialRewardsLoadAtom = atom(false)

/** Reset all real-atoms in this file to it's initial State */
export const rewardsAtomReset = atom(null, (get, set) => {
  set(rewardsAtom, [])
  set(initialRewardsLoadAtom, false)
})
