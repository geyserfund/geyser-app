import { atom } from 'jotai'

import { toInt } from '@/utils'

import { ProjectRewardFragment } from '../../../types'
import { isProjectOwnerAtom } from './projectAtom'

/** Rewards for the Project in context */
export const rewardsAtom = atom<ProjectRewardFragment[]>([])

/** Active rewards for the Project in context */
export const activeRewardsAtom = atom((get) => {
  const rewards = get(rewardsAtom)
  return rewards.filter((reward) => !reward.isHidden)
})

/** Hidden rewards for the Project in context */
export const hiddenRewardsAtom = atom((get) => {
  const rewards = get(rewardsAtom)
  return rewards.filter((reward) => reward.isHidden)
})

/** Boolean to see if rewards exists */
export const hasRewardsAtom = atom((get) => {
  const activeRewards = get(activeRewardsAtom)
  const hiddenRewards = get(hiddenRewardsAtom)
  const isProjectOwner = get(isProjectOwnerAtom)
  return activeRewards.length > 0 || (isProjectOwner && hiddenRewards.length > 0)
})
/** add or update a reward */
export const addUpdateRewardsAtom = atom(null, (get, set, currentReward: ProjectRewardFragment) => {
  const allRewards = get(rewardsAtom)
  const isExist = allRewards.some((reward) => toInt(reward.id) === toInt(currentReward.id))

  if (isExist) {
    set(rewardsAtom, (rewards) => {
      return rewards.map((reward) => {
        if (toInt(reward.id) === toInt(currentReward.id)) {
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
