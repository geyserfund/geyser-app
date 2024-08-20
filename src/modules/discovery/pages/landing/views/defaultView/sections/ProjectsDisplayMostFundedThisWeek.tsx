import { useTranslation } from 'react-i18next'

import { useFilterContext } from '@/context/filter'
import { useMostFundedOfTheWeekProjectsState } from '@/shared/hooks/graphqlState'

import { Tag } from '../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

interface ProjectDisplayProps {
  tag?: Tag
}

const NO_OF_PROJECT_TO_LOAD = 4

export const ProjectsDisplayMostFundedThisWeek = ({ tag }: ProjectDisplayProps) => {
  const { t } = useTranslation()
  const { updateFilter } = useFilterContext()

  const { projects, loading } = useMostFundedOfTheWeekProjectsState({
    tagIds: tag ? [tag.id] : [],
    take: NO_OF_PROJECT_TO_LOAD,
  })

  const onSeeAllClick = () => {
    if (tag) {
      updateFilter({ tagIds: [tag.id] })
    }
  }

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  if (projects.length <= 2) {
    return null
  }

  return (
    <>
      <ProjectDisplayBody
        title={tag?.label ? t('Trending in') : ''}
        subtitle={tag?.label || t('Recent Projects')}
        projects={projects}
        onSeeAllClick={onSeeAllClick}
      />
    </>
  )
}
