import { useState } from 'react'

import {
  ProjectForLandingPageFragment,
  ProjectsMostFundedAllOrNothingRange,
  useProjectsMostFundedAllOrNothingQuery,
} from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

const NO_OF_PROJECT_TO_LOAD = 20

export const TrendingCampaigns = () => {
  const [campaignProjects, setCampaignProjects] = useState<ProjectForLandingPageFragment[]>([])

  const { loading } = useProjectsMostFundedAllOrNothingQuery({
    variables: {
      input: {
        take: NO_OF_PROJECT_TO_LOAD,
        range: ProjectsMostFundedAllOrNothingRange.Week,
      },
    },
    onCompleted(data) {
      setCampaignProjects(data.projectsMostFundedAllOrNothing.map((project) => project.project))
    },
  })

  console.log('TrendingCampaigns', campaignProjects)

  return <RenderProjectList projects={campaignProjects} loading={loading} />
}
