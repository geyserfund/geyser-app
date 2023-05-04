import { SortType, useFilterContext } from '../../../../context'
import { useMostFundedOfTheWeekProjectsState } from '../../../../hooks/graphqlState'
import { Tag } from '../../../../types'
import { ProjectDisplayBody } from '../elements'
import { ProjectsDisplaySkeleton } from './ProjectsDisplay'

interface ProjectDisplayProps {
  tag?: Tag
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectsDisplayMostFundedThisWeek = ({
  tag,
}: ProjectDisplayProps) => {
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

  if (projects.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={tag?.label || 'Recent Projects'}
      subtitle={tag?.label ? 'Trending in' : ''}
      projects={projects}
      onSeeAllClick={onSeeAllClick}
    />
  )
}
