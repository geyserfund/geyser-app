import { useState } from 'react'

import { ProjectForLandingPageFragment, useProjectsAonAlmostOverQuery } from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

const NO_OF_PROJECT_TO_LOAD = 20

export const AlmostOverCampaigns = () => {
  const [campaignProjects, setCampaignProjects] = useState<ProjectForLandingPageFragment[]>([])

  const { loading } = useProjectsAonAlmostOverQuery({
    variables: {
      input: {
        pagination: {
          take: NO_OF_PROJECT_TO_LOAD,
        },
      },
    },
    onCompleted(data) {
      setCampaignProjects(data.projectsAonAlmostOver.projects)
    },
  })

  return <RenderProjectList projects={campaignProjects} loading={loading} />
}
