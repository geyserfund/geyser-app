import { atom, useAtom } from 'jotai'

import { ProjectViewBaseStats } from '../../../../../types'
import { InsightsOptions } from './components'

type StatsInsightsAtom = {
  contributionCount: number
  prevContributionCount: number
  contributorsCount: number
  prevContributorsCount: number
  rewardsPurchased: number
  prevRewardsPurchased: number
  viewCount: number
  prevViewCount: number
  visitorCount: number
  prevVisitorCount: number
  countries: ProjectViewBaseStats[]
  referrers: ProjectViewBaseStats[]
}

export const selectionAtom = atom<InsightsOptions>(InsightsOptions.lastWeek)

export const statsInsightsAtom = atom<StatsInsightsAtom>({
  contributionCount: 0,
  prevContributionCount: 0,
  contributorsCount: 0,
  prevContributorsCount: 0,
  rewardsPurchased: 0,
  prevRewardsPurchased: 0,
  viewCount: 0,
  prevViewCount: 0,
  visitorCount: 0,
  prevVisitorCount: 0,
  countries: [],
  referrers: [],
})

export const useSelectionAtom = () => useAtom(selectionAtom)
export const useStatsInsightsAtom = () => useAtom(statsInsightsAtom)
