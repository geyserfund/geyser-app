import { useTranslation } from 'react-i18next'

import { SortType, useFilterContext } from '../../../../context'
import { useMostFundedOfTheWeekProjectsState } from '../../../../hooks/graphqlState'
import { Tag } from '../../../../types'
import { MobileDivider } from '../../../grants/components'
import { ProjectDisplayBody } from '../elements'
import { ProjectsDisplaySkeleton } from './ProjectsDisplay'

interface ProjectDisplayProps {
  tag?: Tag
  hasMobileDivider?: boolean
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectsDisplayMostFundedThisWeek = ({
  tag,
  hasMobileDivider,
}: ProjectDisplayProps) => {
  const { t } = useTranslation()
  const { updateFilter } = useFilterContext()

  const { projects, loading } = useMostFundedOfTheWeekProjectsState({
    tagIds: tag ? [tag.id] : [],
    take: NO_OF_PROJECT_TO_LOAD,
  })

  const onSeeAllClick = () => {
    if (tag) {
      updateFilter({ tagIds: [tag.id], sort: SortType.recent })
    } else {
      updateFilter({ sort: SortType.recent, recent: true })
    }
  }

  if (loading) {
    return <ProjectsDisplaySkeleton />
  }

  if (projects.length <= 2) {
    return null
  }

  return (
    <>
      <ProjectDisplayBody
        title={tag?.label || t('Recent Projects')}
        subtitle={tag?.label ? t('Trending in') : ''}
        projects={projects}
        onSeeAllClick={onSeeAllClick}
      />
      {hasMobileDivider && <MobileDivider mt={2} />}
    </>
  )
}
