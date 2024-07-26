import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { ProjectFunderFragment } from 'types'

export enum LeaderboardPeriod {
  allTime = 'all-time',
  lastMonth = 'last-month',
  lastWeek = 'last-week',
}

/** Project funders for leaderboard sorted by amount funded */
export const fundersAtom = atom<ProjectFunderFragment[]>([])

/** Collection of Project funders list based on leaderboard period */
export const fundersFamily = atomFamily(
  ({ value }: { period: LeaderboardPeriod; value?: ProjectFunderFragment[] }) => atom(value || []),
  (a, b) => a.period === b.period,
)

/** Reset all real-atoms in this file to it's initial State */
export const fundersAtomReset = atom(null, (get, set) => {
  set(fundersAtom, [])
  set(fundersFamily({ period: LeaderboardPeriod.allTime }), [])
  set(fundersFamily({ period: LeaderboardPeriod.lastMonth }), [])
  set(fundersFamily({ period: LeaderboardPeriod.lastWeek }), [])
})
