import { atom } from 'jotai'
import { ProjectFundingTxFragment } from 'types'

/** Project contributions for leaderboard sorted by latest */
export const contributionsAtom = atom<ProjectFundingTxFragment[]>([])

/** Loading state for project contributions */
export const contributionsLoadingAtom = atom(true)
