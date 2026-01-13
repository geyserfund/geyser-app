import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { getIsAonActive } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { ProjectForLandingPageFragment } from '@/types/index.ts'
import { isActive, isAllOrNothing } from '@/utils'

import {
  ProjectsMostFundedAllOrNothingRange,
  useProjectsMostFundedAllOrNothingQuery,
} from '../../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

const NO_OF_PROJECT_TO_LOAD = 4

/** Calculate AON project completion percentage */
const getAonCompletionPercentage = (project: ProjectForLandingPageFragment): number => {
  if (!project.aonGoal?.goalAmount) {
    return 0
  }

  const balance = project.aonGoal.balance ?? project.balance ?? 0
  return Math.round((balance / project.aonGoal.goalAmount) * 100)
}

/** Check if funding is disabled for a project */
const isFundingDisabled = (project: ProjectForLandingPageFragment): boolean => {
  if (isAllOrNothing(project)) {
    return !getIsAonActive(project)
  }

  return !isActive(project.status)
}

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

  const ProjectByCategoryList =
    data?.projectsMostFundedAllOrNothing
      ?.map((project) => project.project)
      .sort((a, b) => {
        const aFundingDisabled = isFundingDisabled(a)
        const bFundingDisabled = isFundingDisabled(b)

        // Projects that can receive funding come first
        if (aFundingDisabled !== bFundingDisabled) {
          return aFundingDisabled ? 1 : -1
        }

        // Within each group, sort by completion percentage (descending)
        return getAonCompletionPercentage(b) - getAonCompletionPercentage(a)
      }) || []

  if (ProjectByCategoryList.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={t('Trending All-or-Nothing campaigns')}
      projects={ProjectByCategoryList}
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryCampaigns')} />}
    />
  )
}
