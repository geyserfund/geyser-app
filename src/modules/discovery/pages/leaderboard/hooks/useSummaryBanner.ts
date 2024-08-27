import { useProjectsSummaryQuery } from '@/types'

export const useSummaryBannerStats = () => {
  const { data, loading, error } = useProjectsSummaryQuery()

  const stats = {
    projectsCount: data?.projectsSummary?.projectsCount || 0,
    bitcoinsRaised: data?.projectsSummary?.fundedTotal || 0,
    contributorsCount: data?.projectsSummary?.fundersCount || 0,
  }

  return { ...stats, loading, error }
}
