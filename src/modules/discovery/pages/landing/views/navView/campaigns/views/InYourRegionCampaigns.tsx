import { useState } from 'react'

import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook.tsx'
import {
  OrderByDirection,
  ProjectForLandingPageFragment,
  ProjectFundingStrategy,
  ProjectsGetWhereInput,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  useGetUserIpCountryQuery,
  useProjectsForLandingPageQuery,
} from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

const NO_OF_PROJECT_TO_LOAD = 20

export const InYourRegionCampaigns = () => {
  const [campaignProjects, setCampaignProjects] = useState<ProjectForLandingPageFragment[]>([])

  const [loading, setLoading] = useState(true)

  const { data: userIpCountryData } = useGetUserIpCountryQuery({
    onCompleted() {
      setLoading(false)
    },
    onError() {
      setLoading(false)
    },
  })

  const where = {
    fundingStrategy: ProjectFundingStrategy.AllOrNothing,
    countryCode: userIpCountryData?.userIpCountry || undefined,
  } as ProjectsGetWhereInput

  const orderBy = [
    {
      direction: OrderByDirection.Desc,
      field: ProjectsOrderByField.LaunchedAt,
    },
    {
      field: ProjectsOrderByField.Balance,
      direction: OrderByDirection.Desc,
    },
  ] as ProjectsOrderByInput[]

  const { fetchMore, loading: loadingProjects } = useProjectsForLandingPageQuery({
    skip: loading,
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: NO_OF_PROJECT_TO_LOAD,
        },
      },
    },
    onCompleted(data) {
      if (data.projectsGet.projects) {
        handleDataUpdate(data.projectsGet.projects)
      }
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } = usePaginationAtomHook({
    fetchMore,
    queryName: ['projectsGet', 'projects'],
    itemLimit: NO_OF_PROJECT_TO_LOAD,
    where,
    orderBy,
    setData: setCampaignProjects,
  })

  return (
    <RenderProjectList
      projects={campaignProjects}
      loading={loading || loadingProjects}
      isLoadingMore={isLoadingMore}
      noMoreItems={noMoreItems}
      fetchNext={fetchNext}
    />
  )
}
