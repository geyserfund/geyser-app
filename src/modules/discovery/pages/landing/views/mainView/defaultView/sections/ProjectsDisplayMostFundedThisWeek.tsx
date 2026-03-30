import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterContext } from '@/context/filter'
import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'

import {
  OrderByDirection,
  OrderByOptions,
  ProjectCategory,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  ProjectSubCategory,
  usePostsForLandingPageQuery,
  useProjectsForLandingPageQuery,
} from '../../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

interface ProjectDisplayProps {
  title?: string
  noRightContent?: boolean
  category?: ProjectCategory
  subCategory?: ProjectSubCategory
}

const NO_OF_ITEMS_TO_LOAD = 3

export const ProjectsDisplayMostFundedThisWeek = ({
  title,
  category,
  subCategory,
  noRightContent,
}: ProjectDisplayProps) => {
  const { t } = useTranslation()
  const { updateFilter } = useFilterContext()

  const { loading, data } = useProjectsForLandingPageQuery({
    skip: !category && !subCategory,
    variables: {
      input: {
        orderBy: [
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.LaunchedAt,
          },
        ],
        where: {
          category,
          status: ProjectsGetWhereInputStatus.Active,
          subCategory,
        },
        pagination: {
          take: NO_OF_ITEMS_TO_LOAD,
        },
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
          take: NO_OF_ITEMS_TO_LOAD,
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

  const projects = useMemo(() => data?.projectsGet.projects ?? [], [data?.projectsGet.projects])
  const posts = useMemo(() => postsQueryData?.posts ?? [], [postsQueryData?.posts])

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  if (projects.length === 0) {
    return null
  }

  const sectionLabel = category
    ? ProjectCategoryLabel[category]
    : subCategory
    ? ProjectSubCategoryLabel[subCategory]
    : ''

  return (
    <ProjectDisplayBody
      title={
        title
          ? title
          : sectionLabel
          ? t("What's happening in {{label}}", { label: sectionLabel })
          : t('Recent Projects')
      }
      projects={projects}
      posts={posts}
      rightContent={
        !noRightContent && (
          <DiscoverMoreButton
            id={category ? `discovery-see-all-${category}` : subCategory ? `discovery-see-all-${subCategory}` : ''}
            onClick={() =>
              onSeeAllClick({
                category,
                subCategory,
              })
            }
          />
        )
      }
    />
  )
}
