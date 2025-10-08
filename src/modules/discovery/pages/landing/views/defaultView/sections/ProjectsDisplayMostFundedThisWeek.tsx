import { useTranslation } from 'react-i18next'

import { useFilterContext } from '@/context/filter'
import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'

import {
  OrderByOptions,
  ProjectCategory,
  ProjectsMostFundedByCategoryRange,
  ProjectSubCategory,
  usePostsForLandingPageQuery,
  useProjectsMostFundedByCategoryQuery,
} from '../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

interface ProjectDisplayProps {
  category?: ProjectCategory
  subCategory?: ProjectSubCategory
}

const NO_OF_PROJECT_TO_LOAD = 5

export const ProjectsDisplayMostFundedThisWeek = ({ category, subCategory }: ProjectDisplayProps) => {
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
          take: 1,
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

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  const ProjectByCategoryList =
    data?.projectsMostFundedByCategory?.filter((tagMap) => tagMap.projects.length >= 4) || []

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
              category
                ? ProjectCategoryLabel[category]
                : subCategory
                ? ProjectSubCategoryLabel[subCategory]
                : t('Recent Projects')
            }
            projects={projects}
            posts={postsQueryData?.posts || []}
            rightContent={
              <DiscoverMoreButton
                id={category ? `discovery-see-all-${category}` : subCategory ? `discovery-see-all-${subCategory}` : ''}
                onClick={() =>
                  onSeeAllClick({
                    category: projectByCategory.category,
                    subCategory: projectByCategory.subCategory,
                  })
                }
              />
            }
          />
        )
      })}
    </>
  )
}
