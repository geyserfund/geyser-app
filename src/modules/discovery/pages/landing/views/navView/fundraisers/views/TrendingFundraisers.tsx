import { useState } from 'react'

import {
  ProjectForLandingPageFragment,
  ProjectsMostFundedTakeItAllRange,
  useProjectsMostFundedTakeItAllQuery,
} from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

export const TrendingFundraisers = () => {
  const [campaignProjects, setCampaignProjects] = useState<ProjectForLandingPageFragment[]>([])

  const { loading } = useProjectsMostFundedTakeItAllQuery({
    variables: {
      input: {
        take: 30,
        range: ProjectsMostFundedTakeItAllRange.Week,
      },
    },
    onCompleted(data) {
      setCampaignProjects(data.projectsMostFundedTakeItAll.map((project) => project.project))
    },
  })

  return <RenderProjectList projects={campaignProjects} loading={loading} />
}
