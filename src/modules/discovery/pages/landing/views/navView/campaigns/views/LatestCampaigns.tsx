import { useState } from 'react'

import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook.tsx'
import {
  OrderByDirection,
  ProjectForLandingPageFragment,
  ProjectFundingStrategy,
  ProjectsGetWhereInput,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  useProjectsForLandingPageQuery,
} from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

const NO_OF_PROJECT_TO_LOAD = 20

export const LatestCampaigns = () => {
  const [campaignProjects, setCampaignProjects] = useState<ProjectForLandingPageFragment[]>([])

  const where = {
    fundingStrategy: ProjectFundingStrategy.AllOrNothing,
  } as ProjectsGetWhereInput

  const orderBy = [
    {
      direction: OrderByDirection.Desc,
      field: ProjectsOrderByField.LaunchedAt,
    },
  ] as ProjectsOrderByInput[]

  const { fetchMore, loading } = useProjectsForLandingPageQuery({
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
      loading={loading}
      isLoadingMore={isLoadingMore}
      noMoreItems={noMoreItems}
      fetchNext={fetchNext}
    />
  )
}
