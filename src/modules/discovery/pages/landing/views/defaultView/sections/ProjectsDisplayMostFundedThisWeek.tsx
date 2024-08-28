import { useTranslation } from 'react-i18next'

import { useFilterContext } from '@/context/filter'
import { getListOfTags } from '@/shared/constants'

import { ProjectsMostFundedByTagRange, Tag, useProjectsMostFundedByTagQuery } from '../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

interface ProjectDisplayProps {
  tag?: Tag
}

const NO_OF_PROJECT_TO_LOAD = 4

export const ProjectsDisplayMostFundedThisWeek = ({ tag }: ProjectDisplayProps) => {
  const { t } = useTranslation()
  const { updateFilter } = useFilterContext()

  const allTags = getListOfTags()

  const { loading, data } = useProjectsMostFundedByTagQuery({
    variables: {
      input: {
        take: NO_OF_PROJECT_TO_LOAD,
        range: ProjectsMostFundedByTagRange.Week,
        tagIds: allTags.map((tag) => tag.id),
      },
    },
  })

  const onSeeAllClick = (tagId: number) => {
    if (tagId) {
      updateFilter({ tagIds: [tagId] })
    }
  }

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  const ProjectByTagList = data?.projectsMostFundedByTag?.filter((tagMap) => tagMap.projects.length >= 4) || []

  return (
    <>
      {ProjectByTagList.map((projectByTag) => {
        if (projectByTag.projects.length === 0) return null

        const currentTag = allTags.find((tag) => tag.id === projectByTag.tagId)

        const projects = projectByTag.projects.map((project) => project.project)

        return (
          <ProjectDisplayBody
            key={projectByTag.tagId}
            title={currentTag?.label ? t('Trending in') : ''}
            subtitle={currentTag?.label || t('Recent Projects')}
            projects={projects}
            onSeeAllClick={() => onSeeAllClick(projectByTag.tagId)}
          />
        )
      })}
    </>
  )
}
