import { atom } from 'jotai'

import { ProjectRewardFragment } from '../../../types'

/** Rewards for the Project in context */
export const rewardsAtom = atom<ProjectRewardFragment[]>([])

/** If project has Rewards */
export const hasRewardsAtom = atom((get) => {
  const rewards = get(rewardsAtom)

  return rewards.length > 0
})
