import { useQuery } from '@apollo/client'

import { QUERY_PROJECTS_SUMMARY } from '@/graphqlBase'

export const useSummaryBannerStats = () => {
  const { data, loading, error } = useQuery(QUERY_PROJECTS_SUMMARY)

  const stats = {
    projectsCount: data?.projectsSummary?.projectsCount || 0,
    bitcoinsRaised: data?.projectsSummary?.fundedTotal || 0,
    contributorsCount: data?.projectsSummary?.fundersCount || 0,
  }

  return { ...stats, loading, error }
}
