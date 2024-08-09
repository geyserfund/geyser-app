import { useQuery } from '@apollo/client'

import { QUERY_SUMMARY_BANNER } from '../graphql/queries/summaryBannerQuery'

export const useSummaryBannerStats = () => {
  const { data, loading, error } = useQuery(QUERY_SUMMARY_BANNER)

  const stats = {
    projectsCount: data?.projectsSummary?.projectsCount || 0,
    bitcoinsRaised: data?.projectsSummary?.fundedTotal || 0,
    contributorsCount: data?.projectsSummary?.fundersCount || 0,
  }

  return { ...stats, loading, error }
}
