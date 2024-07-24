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

export const fundersFamily = atomFamily(
  ({ value }: { period: LeaderboardPeriod; value?: ProjectFunderFragment[] }) => atom(value || []),
  (a, b) => a.period === b.period,
)
