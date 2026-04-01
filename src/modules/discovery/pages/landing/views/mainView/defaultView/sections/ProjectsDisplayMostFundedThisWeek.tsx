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
  const primaryCategory = categories?.[0] ?? category
  const secondaryCategory = categories?.[1]

  const { loading: primaryLoading, data: primaryData } = useProjectsForLandingPageQuery({
    skip: !primaryCategory && !subCategory,
    variables: {
      input: {
        orderBy: [
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.LaunchedAt,
          },
        ],
        where: {
          category: primaryCategory,
          status: ProjectsGetWhereInputStatus.Active,
          subCategory,
        },
        pagination: {
          take: NO_OF_ITEMS_TO_LOAD,
        },
      },
    },
  })

  const { loading: secondaryLoading, data: secondaryData } = useProjectsForLandingPageQuery({
    skip: !secondaryCategory,
    variables: {
      input: {
        orderBy: [
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.LaunchedAt,
          },
        ],
        where: {
          category: secondaryCategory,
          status: ProjectsGetWhereInputStatus.Active,
        },
        pagination: {
          take: NO_OF_ITEMS_TO_LOAD,
        },
      },
    },
  })

  const { data: primaryPostsQueryData } = usePostsForLandingPageQuery({
    skip: !primaryCategory,
    variables: {
      input: {
        orderBy: {
          publishedAt: OrderByOptions.Desc,
        },
        pagination: {
          take: NO_OF_ITEMS_TO_LOAD,
        },
        where: {
          category: primaryCategory,
        },
      },
    },
  })

  const { data: secondaryPostsQueryData } = usePostsForLandingPageQuery({
    skip: !secondaryCategory,
    variables: {
      input: {
        orderBy: {
          publishedAt: OrderByOptions.Desc,
        },
        pagination: {
          take: NO_OF_ITEMS_TO_LOAD,
        },
        where: {
          category: secondaryCategory,
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

  const loading = primaryLoading || secondaryLoading
  const projects = useMemo(() => {
    const combinedProjects = [...(primaryData?.projectsGet.projects ?? []), ...(secondaryData?.projectsGet.projects ?? [])]
    const uniqueProjects = combinedProjects.filter(
      (project, index, array) => array.findIndex((candidate) => candidate.id === project.id) === index,
    )

    return uniqueProjects
      .sort((left, right) => new Date(right.launchedAt ?? 0).getTime() - new Date(left.launchedAt ?? 0).getTime())
      .slice(0, NO_OF_ITEMS_TO_LOAD)
  }, [primaryData?.projectsGet.projects, secondaryData?.projectsGet.projects])
  const posts = useMemo(() => {
    const combinedPosts = [...(primaryPostsQueryData?.posts ?? []), ...(secondaryPostsQueryData?.posts ?? [])]
    const uniquePosts = combinedPosts.filter(
      (post, index, array) => array.findIndex((candidate) => candidate.id === post.id) === index,
    )

    return uniquePosts
      .sort((left, right) => new Date(right.publishedAt ?? 0).getTime() - new Date(left.publishedAt ?? 0).getTime())
      .slice(0, NO_OF_ITEMS_TO_LOAD)
  }, [primaryPostsQueryData?.posts, secondaryPostsQueryData?.posts])

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  if (projects.length === 0) {
    return null
  }

  const sectionLabel = primaryCategory && !secondaryCategory
    ? ProjectCategoryLabel[primaryCategory]
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
            id={primaryCategory ? `discovery-see-all-${primaryCategory}` : subCategory ? `discovery-see-all-${subCategory}` : ''}
            onClick={() =>
              onSeeAllClick({
                category: primaryCategory,
                subCategory,
              })
            }
          />
        )
      }
    />
  )
}
