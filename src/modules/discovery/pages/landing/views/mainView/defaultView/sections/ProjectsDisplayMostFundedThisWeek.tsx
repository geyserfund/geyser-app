import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'
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
  categories?: ProjectCategory[]
  subCategory?: ProjectSubCategory
}

const NO_OF_ITEMS_TO_LOAD = 3

export const ProjectsDisplayMostFundedThisWeek = ({
  title,
  category,
  categories,
  subCategory,
  noRightContent,
}: ProjectDisplayProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const hasCategories = Boolean(categories?.length)

  const { loading, data } = useProjectsForLandingPageQuery({
    skip: !category && !hasCategories && !subCategory,
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
          categories,
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
    skip: !category && !hasCategories,
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
          categories,
        },
      },
    },
  })

  const onSeeAllClick = ({ category, subCategory }: { category?: string | null; subCategory?: string | null }) => {
    if (category) {
      navigate(getPath('discoveryProjectsCategory', category))
      return
    }

    if (subCategory) {
      navigate(getPath('discoveryProjectsSubCategory', subCategory))
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

  let sectionLabel = ''
  if (category) {
    sectionLabel = ProjectCategoryLabel[category] || ''
  } else if (subCategory) {
    sectionLabel = ProjectSubCategoryLabel[subCategory] || ''
  }

  const titleContent = title || (sectionLabel ? t("What's happening in {{label}}", { label: sectionLabel }) : t('Recent Projects'))
  const discoverMoreId = category ? `discovery-see-all-${category}` : subCategory ? `discovery-see-all-${subCategory}` : ''

  return (
    <ProjectDisplayBody
      title={titleContent}
      projects={projects}
      posts={posts}
      rightContent={
        !noRightContent && (
          <DiscoverMoreButton
            id={discoverMoreId}
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
