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

  const projectByTagOrdered = ProjectByTagList.sort(
    (a, b) => allTags.findIndex((tag) => tag.id === a.tagId) - allTags.findIndex((tag) => tag.id === b.tagId),
  )

  const tagToSubtextMap: Record<string, string> = {
    education: 'Projects enabling financial literacy and Bitcoin education around the world',
    culture: 'Projects focused on surfacing Bitcoin Culture through films, music, literature, podcasts and more',
    humanitarian: 'Projects supporting humanitarian efforts around the world through Bitcoin',
    community: 'Projects bringing about a Bitcoin Community, from meetups to circular economies',
    films: 'Projects telling important stories through films, documentaries and other visual arts',
    nostr: 'Projects building on, or bringing about Nostr adoption around the world',
    'orange-pilling': 'Projects focused on spreading Bitcoin in a variety of ways',
    'open-source': 'Projects focused on open source development',
    events: 'Projects focused on bringing people together around events in IRL',
    media: 'Projects creating valuable content',
  }

  return (
    <>
      {projectByTagOrdered.map((projectByTag) => {
        if (projectByTag.projects.length === 0) return null

        const currentTag = allTags.find((tag) => tag.id === projectByTag.tagId)

        const projects = projectByTag.projects.map((project) => project.project)

        return (
          <ProjectDisplayBody
            key={projectByTag.tagId}
            title={currentTag?.label ? t('Trending in') : ''}
            subtitle={currentTag?.label || t('Recent Projects')}
            subtext={currentTag?.label ? tagToSubtextMap[currentTag.label] : undefined}
            projects={projects}
            onSeeAllClick={() => onSeeAllClick(projectByTag.tagId)}
          />
        )
      })}
    </>
  )
}
