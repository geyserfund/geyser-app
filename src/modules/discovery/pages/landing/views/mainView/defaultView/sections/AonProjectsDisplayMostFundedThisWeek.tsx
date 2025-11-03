import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'

import {
  ProjectsMostFundedAllOrNothingRange,
  useProjectsMostFundedAllOrNothingQuery,
} from '../../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

const NO_OF_PROJECT_TO_LOAD = 4

export const AonProjectsDisplayMostFundedThisWeek = () => {
  const { t } = useTranslation()

  const { loading, data } = useProjectsMostFundedAllOrNothingQuery({
    variables: {
      input: {
        range: ProjectsMostFundedAllOrNothingRange.Week,
        take: NO_OF_PROJECT_TO_LOAD,
      },
    },
  })

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  const ProjectByCategoryList = data?.projectsMostFundedAllOrNothing?.map((project) => project.project) || []

  if (ProjectByCategoryList.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={t('Trending in All or Nothing')}
      projects={ProjectByCategoryList}
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryCampaigns')} />}
    />
  )
}
