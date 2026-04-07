import { Button, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { filterPostsByUniqueProjects } from '@/helpers/filterPostsByUniqueProjects.ts'
import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { Body } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'

import {
  OrderByDirection,
  OrderByOptions,
  ProjectCategory,
  ProjectsGetWhereInputStatus,
  ProjectsMostFundedByCategoryRange,
  ProjectsOrderByField,
  ProjectSubCategory,
  usePostsForLandingPageQuery,
  useProjectsForLandingPageQuery,
  useProjectsMostFundedByCategoryQuery,
} from '../../../../../../../../types'
import {
  type ProjectDisplayItem,
  ProjectDisplayBody,
  ProjectDisplayBodySkeleton,
} from '../components/ProjectDisplayBody'
import { ProjectRowLayout } from '../components/ProjectRowLayout'

interface ProjectDisplayProps {
  title?: string
  noRightContent?: boolean
  category?: ProjectCategory
  categories?: ProjectCategory[]
  subCategory?: ProjectSubCategory
}

const NO_OF_ITEMS_TO_SHOW = 3
const NO_OF_ITEMS_TO_FETCH = 5
const NO_OF_POSTS_TO_FETCH = 10
const MINIMUM_VISIBLE_AMOUNT_USD = 100

const shuffleProjects = <T,>(projects: T[]) => {
  const shuffledProjects = [...projects]

  for (let index = shuffledProjects.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentProject = shuffledProjects[index]

    shuffledProjects[index] = shuffledProjects[randomIndex] as T
    shuffledProjects[randomIndex] = currentProject as T
  }

  return shuffledProjects
}

const isRecentlyLaunched = (launchedAt?: ProjectDisplayItem['launchedAt'] | null) => {
  if (!launchedAt) {
    return false
  }

  const launchDate = DateTime.fromMillis(Number(launchedAt))

  return launchDate.isValid && launchDate.hasSame(DateTime.local(), 'month')
}

const getDisplayedAmountUsd = (project: ProjectDisplayItem) =>
  project.contributionSummary?.contributionsTotalUsd ?? project.balanceUsdCent / 100

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

  const {
    loading: latestProjectsLoading,
    data: latestProjectsData,
    error: latestProjectsError,
    refetch: refetchLatestProjects,
  } = useProjectsForLandingPageQuery({
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
          take: NO_OF_ITEMS_TO_FETCH,
        },
      },
    },
  })

  const {
    data: trendingProjectsData,
    loading: trendingProjectsLoading,
    error: trendingProjectsError,
    refetch: refetchTrendingProjects,
  } = useProjectsMostFundedByCategoryQuery({
    skip: !category && !subCategory,
    variables: {
      input: {
        category,
        range: ProjectsMostFundedByCategoryRange.Week,
        subCategory,
        take: NO_OF_ITEMS_TO_FETCH,
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
          take: NO_OF_POSTS_TO_FETCH,
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

  const latestProjects = useMemo(
    () => latestProjectsData?.projectsGet.projects ?? [],
    [latestProjectsData?.projectsGet.projects],
  )
  const weeklyTrendingProjects = useMemo(() => {
    const matchingCategory = trendingProjectsData?.projectsMostFundedByCategory.find((projectGroup) => {
      if (subCategory) {
        return projectGroup.subCategory === subCategory
      }

      if (category) {
        return projectGroup.category === category
      }

      return true
    })

    return matchingCategory?.projects ?? []
  }, [category, subCategory, trendingProjectsData?.projectsMostFundedByCategory])
  const projects = useMemo<ProjectDisplayItem[]>(() => {
    const projectMap = new Map<string, ProjectDisplayItem>()

    for (const project of latestProjects) {
      projectMap.set(String(project.id), project)
    }

    for (const projectRow of weeklyTrendingProjects) {
      const projectId = String(projectRow.project.id)
      const existingProject = projectMap.get(projectId)

      projectMap.set(projectId, {
        ...(existingProject ?? projectRow.project),
        contributionSummary: projectRow.contributionsSummary ?? existingProject?.contributionSummary,
      })
    }

    return shuffleProjects(
      Array.from(projectMap.values()).map((project) => ({
        ...project,
        hideContributionContent: getDisplayedAmountUsd(project) < MINIMUM_VISIBLE_AMOUNT_USD,
        statusPillLabel: isRecentlyLaunched(project.launchedAt) ? t('Recently launched') : t('Weekly trending'),
      })),
    ).slice(0, NO_OF_ITEMS_TO_SHOW)
  }, [latestProjects, t, weeklyTrendingProjects])
  const posts = useMemo(
    () => filterPostsByUniqueProjects(postsQueryData?.posts ?? [], NO_OF_ITEMS_TO_SHOW),
    [postsQueryData?.posts],
  )
  const sectionLabel = category
    ? ProjectCategoryLabel[category]
    : subCategory
    ? ProjectSubCategoryLabel[subCategory]
    : ''
  const sectionTitle = title
    ? title
    : sectionLabel
    ? t("What's happening in {{label}}", { label: sectionLabel })
    : t('Recent Projects')

  if (latestProjectsLoading || trendingProjectsLoading) {
    return <ProjectDisplayBodySkeleton />
  }

  if (projects.length === 0) {
    if (latestProjectsError || trendingProjectsError) {
      return (
        <ProjectRowLayout title={sectionTitle} width="100%">
          <VStack alignItems="start" spacing={4} py={4}>
            <Body>{t('Failed to load projects')}</Body>
            <Button
              size="sm"
              variant="outline"
              colorScheme="neutral1"
              onClick={() => {
                refetchLatestProjects()
                refetchTrendingProjects()
              }}
            >
              {t('Retry')}
            </Button>
          </VStack>
        </ProjectRowLayout>
      )
    }

    return null
  }

  const discoverMoreId = category ? `discovery-see-all-${category}` : subCategory ? `discovery-see-all-${subCategory}` : ''

  return (
    <ProjectDisplayBody
      title={sectionTitle}
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
