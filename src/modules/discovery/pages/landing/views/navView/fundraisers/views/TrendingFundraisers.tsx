import { useState } from 'react'

import {
  ProjectForLandingPageFragment,
  ProjectsMostFundedTakeItAllRange,
  useProjectsMostFundedTakeItAllQuery,
} from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

const NO_OF_PROJECT_TO_LOAD = 30

export const TrendingFundraisers = () => {
  const [campaignProjects, setCampaignProjects] = useState<ProjectForLandingPageFragment[]>([])

  const { loading } = useProjectsMostFundedTakeItAllQuery({
    variables: {
      input: {
        take: NO_OF_PROJECT_TO_LOAD,
        range: ProjectsMostFundedTakeItAllRange.Week,
      },
    },
    onCompleted(data) {
      setCampaignProjects(data.projectsMostFundedTakeItAll.map((project) => project.project))
    },
  })

  return <RenderProjectList projects={campaignProjects} loading={loading} />
}
