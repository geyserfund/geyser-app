import { atom } from 'jotai'

import { ProjectRewardFragment } from '../../../types'

/** Rewards for the Project in context */
export const rewardsAtom = atom<ProjectRewardFragment[]>([])
