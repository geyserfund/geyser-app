import { atom } from 'jotai'
import { ProjectFundingTxFragment } from 'types'

/** Project contributions for leaderboard sorted by latest */
export const contributionsAtom = atom<ProjectFundingTxFragment[]>([])

export const contributionListAtom = atom<ProjectFundingTxFragment[]>([])
