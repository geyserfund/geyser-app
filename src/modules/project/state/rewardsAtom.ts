import { atom } from 'jotai'

import { ProjectRewardFragment } from '../../../types'
import { isProjectOwnerAtom } from './projectAtom'

/** Rewards for the Project in context */
export const rewardsAtom = atom<ProjectRewardFragment[]>([])

/** Loading state for rewards */
export const initialRewardsLoadingAtom = atom(true)

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
/** Initial rewards load, set to false by default */
export const initialRewardsLoadAtom = atom(false)

/** Reset all real-atoms in this file to it's initial State */
export const rewardsAtomReset = atom(null, (get, set) => {
  set(rewardsAtom, [])
  set(initialRewardsLoadAtom, false)
  set(initialRewardsLoadingAtom, true)
})
