import { useQuery } from '@apollo/client'

import { useFilterContext } from '../../../../context'
import {
  GetProjectsMostFundedOfTheWeekInput,
  ProjectsMostFundedOfTheWeekGet,
  Tag,
} from '../../../../types'
import { QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE } from '../projects.graphql'
import { ProjectDisplayBody } from '../elements'
import { ProjectsDisplaySkeleton } from './ProjectsDisplay'

interface ProjectDisplayProps {
  tag?: Tag
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectsDisplayMostFundedThisWeek = ({
  tag,
}: ProjectDisplayProps) => {
  const { updateFilter, updateSort } = useFilterContext()

  const { data, loading } = useQuery<
    { projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[] },
    { input: GetProjectsMostFundedOfTheWeekInput }
  >(QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE, {
    variables: {
      input: {
        tagIds: tag ? [tag.id] : [],
        take: NO_OF_PROJECT_TO_LOAD,
      },
    },
  })

  const onSeeAllClick = () => {
    if (tag) {
      updateFilter({ tagIds: [tag.id] })
      updateSort({ recent: true })
    } else {
      updateFilter({ recent: true })
      updateSort({ recent: true })
    }
  }

  const projectList =
    data?.projectsMostFundedOfTheWeekGet.map(
      (projectData) => projectData.project,
    ) || []

  if (loading) {
    return <ProjectsDisplaySkeleton />
  }

  if (projectList.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={tag?.label || 'Recent Projects'}
      subtitle={tag?.label ? 'Trending in' : ''}
      projects={projectList}
      onSeeAllClick={onSeeAllClick}
    />
  )
}
