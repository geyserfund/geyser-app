import { useState } from 'react'

import { ProjectForLandingPageFragment, useProjectsAonAlmostFundedQuery } from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

const NO_OF_PROJECT_TO_LOAD = 20

export const AlmostFundedCampaigns = () => {
  const [campaignProjects, setCampaignProjects] = useState<ProjectForLandingPageFragment[]>([])

  const { loading } = useProjectsAonAlmostFundedQuery({
    variables: {
      input: {
        pagination: {
          take: NO_OF_PROJECT_TO_LOAD,
        },
      },
    },
    onCompleted(data) {
      setCampaignProjects(data.projectsAonAlmostFunded.projects)
    },
  })

  return <RenderProjectList projects={campaignProjects} loading={loading} />
}
