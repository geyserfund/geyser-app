import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterContext } from '@/context/filter'
import { filterPostsByUniqueProjects } from '@/helpers/filterPostsByUniqueProjects.ts'
import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'

import {
  OrderByOptions,
  ProjectCategory,
  ProjectsMostFundedByCategoryRange,
  ProjectSubCategory,
  usePostsForLandingPageQuery,
  useProjectsMostFundedByCategoryQuery,
} from '../../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

interface ProjectDisplayProps {
  title?: string
  noRightContent?: boolean
  category?: ProjectCategory
  subCategory?: ProjectSubCategory
}

const NO_OF_PROJECT_TO_LOAD = 6

export const ProjectsDisplayMostFundedThisWeek = ({
  title,
  category,
  subCategory,
  noRightContent,
}: ProjectDisplayProps) => {
  const { t } = useTranslation()
  const { updateFilter } = useFilterContext()

  const { loading, data } = useProjectsMostFundedByCategoryQuery({
    skip: !category && !subCategory,
    variables: {
      input: {
        take: NO_OF_PROJECT_TO_LOAD,
        range: ProjectsMostFundedByCategoryRange.Week,
        category,
        subCategory,
      },
    },
  })

  const { data: postsQueryData } = usePostsForLandingPageQuery({
    skip: !category,
    variables: {
      input: {
        orderBy: {
          publishedAt: OrderByOptions.Desc,
        },
        pagination: {
          take: 10,
        },
        where: {
          category,
        },
      },
    },
  })

  const onSeeAllClick = ({ category, subCategory }: { category?: string | null; subCategory?: string | null }) => {
    if (category) {
      updateFilter({ category })
    }

    if (subCategory) {
      updateFilter({ subCategory })
    }
  }

  const ProjectByCategoryList =
    data?.projectsMostFundedByCategory?.filter((tagMap) => tagMap.projects.length >= 4) || []

  const allPosts = useMemo(() => postsQueryData?.posts || [], [postsQueryData?.posts])

  const filteredPosts = useMemo(() => filterPostsByUniqueProjects(allPosts, 3), [allPosts])

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  return (
    <>
      {ProjectByCategoryList.map((projectByCategory) => {
        if (projectByCategory.projects.length === 0) return null

        const projects = projectByCategory.projects.map((project) => ({
          ...project.project,
          contributionSummary: project.contributionsSummary || undefined,
        }))

        return (
          <ProjectDisplayBody
            key={projectByCategory.category}
            title={
              title
                ? title
                : category
                ? `${t('Trending in')} ${ProjectCategoryLabel[category]}`
                : subCategory
                ? `${t('Trending in')} ${ProjectSubCategoryLabel[subCategory]}`
                : t('Recent Projects')
            }
            projects={projects}
            posts={filteredPosts}
            rightContent={
              !noRightContent && (
                <DiscoverMoreButton
                  id={
                    category ? `discovery-see-all-${category}` : subCategory ? `discovery-see-all-${subCategory}` : ''
                  }
                  onClick={() =>
                    onSeeAllClick({
                      category: projectByCategory.category,
                      subCategory: projectByCategory.subCategory,
                    })
                  }
                />
              )
            }
          />
        )
      })}
    </>
  )
}
