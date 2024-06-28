import { atom } from 'jotai'
import { ProjectFunderFragment } from 'types'

/** Project funders for leaderboard sorted by amount funded */
export const fundersAtom = atom<ProjectFunderFragment[]>([])

/** Loading state for project funders */
export const fundersLoadingAtom = atom(true)
