import { Box, Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { fetchFeaturedProject } from '@/api/airtable.ts'
import { LandingCardBaseSkeleton } from '@/shared/components/layouts/index.ts'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import {
  type GlobalProjectLeaderboardRow,
  LeaderboardPeriod,
  ProjectCategory,
  useFeaturedProjectForLandingPageQuery,
  useLeaderboardGlobalProjectsQuery,
} from '@/types/index.ts'

import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { FeatureAirtableData, FeaturedAirtableResponse } from './Featured.tsx'

type CategoryKey = 'featured' | 'education' | 'culture' | 'community' | 'tools'

type CategoryButton = {
  emoji: string
  key: CategoryKey
  labelKey: string
}

const CATEGORY_BUTTONS: CategoryButton[] = [
  { key: 'featured', labelKey: 'Featured', emoji: '⭐' },
  { key: 'education', labelKey: 'Education', emoji: '🎓' },
  { key: 'culture', labelKey: 'Culture', emoji: '🎨' },
  { key: 'community', labelKey: 'Community', emoji: '🤝' },
  { key: 'tools', labelKey: 'Tools', emoji: '🛠' },
]

const CATEGORY_COPY_KEYS: Record<CategoryKey, string> = {
  featured: 'Support promising and curated projects',
  education: 'Support Bitcoin education initiatives around the world',
  culture: 'Support Bitcoin culture such as music, film and games',
  community: 'Support communities, meetups, and local Bitcoin initiatives',
  tools: 'Discover Bitcoin tools, apps, hardware, and open-source software',
}
const CURATED_PROJECTS_COUNT = 6

export const CuratedProjects = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('featured')
  const [featuredProjectNames, setFeaturedProjectNames] = useState<string[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [featuredError, setFeaturedError] = useState(false)

  const inactiveBg = useColorModeValue('utils.pbg', 'utils.surface')
  const activeBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const hoverBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const inactiveBorderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const activeBorderColor = useColorModeValue('neutral1.6', 'neutral1.7')
  const buttonTextColor = useColorModeValue('neutral1.11', 'neutral1.11')

  const categoryButtons = useMemo(
    () => CATEGORY_BUTTONS.map((button) => ({ ...button, label: t(button.labelKey) })),
    [t],
  )
  const categoryCopy = useMemo(
    () =>
      Object.fromEntries(Object.entries(CATEGORY_COPY_KEYS).map(([key, labelKey]) => [key, t(labelKey)])) as Record<
        CategoryKey,
        string
      >,
    [t],
  )

  const loadFeaturedProjects = useCallback(async () => {
    setLoadingFeatured(true)
    setFeaturedError(false)
    try {
      const response: FeaturedAirtableResponse = await fetchFeaturedProject()
      const projectNames = response.records
        .map((record) => record.fields)
        .filter((data: FeatureAirtableData) => data.Type === 'project' && data.Name)
        .map((data: FeatureAirtableData) => data.Name)
        .slice(0, 6)

      setFeaturedProjectNames(projectNames)
    } catch (_error) {
      setFeaturedError(true)
      setFeaturedProjectNames([])
    } finally {
      setLoadingFeatured(false)
    }
  }, [])

  useEffect(() => {
    if (activeCategory === 'featured') {
      loadFeaturedProjects()
    }
  }, [activeCategory, loadFeaturedProjects])

  const {
    data: educationData,
    loading: educationLoading,
    error: educationError,
    refetch: refetchEducation,
  } = useLeaderboardGlobalProjectsQuery({
    skip: activeCategory !== 'education',
    variables: {
      input: { top: CURATED_PROJECTS_COUNT, period: LeaderboardPeriod.Month, category: ProjectCategory.Education },
    },
  })

  const {
    data: cultureData,
    loading: cultureLoading,
    error: cultureError,
    refetch: refetchCulture,
  } = useLeaderboardGlobalProjectsQuery({
    skip: activeCategory !== 'culture',
    variables: {
      input: { top: CURATED_PROJECTS_COUNT, period: LeaderboardPeriod.Month, category: ProjectCategory.Culture },
    },
  })

  const {
    data: communityData,
    loading: communityLoading,
    error: communityError,
    refetch: refetchCommunity,
  } = useLeaderboardGlobalProjectsQuery({
    skip: activeCategory !== 'community',
    variables: {
      input: { top: CURATED_PROJECTS_COUNT, period: LeaderboardPeriod.Month, category: ProjectCategory.Community },
    },
  })

  const {
    data: toolsData,
    loading: toolsLoading,
    error: toolsError,
    refetch: refetchTools,
  } = useLeaderboardGlobalProjectsQuery({
    skip: activeCategory !== 'tools',
    variables: {
      input: { top: CURATED_PROJECTS_COUNT, period: LeaderboardPeriod.Month, category: ProjectCategory.Tool },
    },
  })

  const getCategoryProjects = () => {
    if (activeCategory === 'featured') {
      return {
        emptyStateMessage: t('No featured projects found'),
        error: featuredError,
        loading: loadingFeatured,
        projectNames: featuredProjectNames,
        retry: loadFeaturedProjects,
      }
    }

    if (activeCategory === 'education') {
      const projectRows = educationData?.leaderboardGlobalProjectsGet || []
      return {
        emptyStateMessage: t('No projects found'),
        error: educationError,
        loading: educationLoading,
        projectRows,
        retry: refetchEducation,
      }
    }

    if (activeCategory === 'culture') {
      const projectRows = cultureData?.leaderboardGlobalProjectsGet || []
      return {
        emptyStateMessage: t('No projects found'),
        error: cultureError,
        loading: cultureLoading,
        projectRows,
        retry: refetchCulture,
      }
    }

    if (activeCategory === 'community') {
      const projectRows = communityData?.leaderboardGlobalProjectsGet || []
      return {
        emptyStateMessage: t('No projects found'),
        error: communityError,
        loading: communityLoading,
        projectRows,
        retry: refetchCommunity,
      }
    }

    if (activeCategory === 'tools') {
      const projectRows = toolsData?.leaderboardGlobalProjectsGet || []
      return {
        emptyStateMessage: t('No tools found'),
        error: toolsError,
        loading: toolsLoading,
        projectRows,
        retry: refetchTools,
      }
    }

    return {
      emptyStateMessage: t('No projects found'),
      error: undefined,
      loading: false,
      projectRows: [],
      retry: undefined,
    }
  }

  const { projectRows = [], projectNames, loading, error, retry, emptyStateMessage } = getCategoryProjects()

  const handleDiscoverMore = () => {
    navigate(getPath('discoveryProjects'))
  }

  return (
    <VStack w="full" spacing={8} alignItems="start">
      <Box
        w="full"
        overflowX={{ base: 'auto', md: 'visible' }}
        overflowY="hidden"
        py={2}
        px={1}
        sx={{
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
          scrollSnapType: 'x proximity',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        <HStack
          spacing={3}
          flexWrap={{ base: 'nowrap', md: 'wrap' }}
          justifyContent={{ base: 'flex-start', md: 'center' }}
          w={{ base: 'max-content', md: 'full' }}
          minW={{ md: 'full' }}
        >
          {categoryButtons.map((button) => (
            <Button
              key={button.key}
              size="xl"
              height="56px"
              flexShrink={0}
              scrollSnapAlign="start"
              variant="ghost"
              color={buttonTextColor}
              border="1px solid"
              borderColor={activeCategory === button.key ? activeBorderColor : inactiveBorderColor}
              onClick={() => setActiveCategory(button.key)}
              leftIcon={<span>{button.emoji}</span>}
              bg={activeCategory === button.key ? activeBg : inactiveBg}
              fontSize={{ base: 'md', lg: 'lg' }}
              fontWeight={600}
              paddingX={{ base: 5, lg: 6 }}
              _hover={{
                bg: hoverBg,
                borderColor: activeBorderColor,
              }}
              _active={{ bg: hoverBg }}
            >
              {button.label}
            </Button>
          ))}
        </HStack>
      </Box>

      <H3 size={{ base: 'md', lg: '2xl' }} dark bold>
        {categoryCopy[activeCategory]}
      </H3>

      {loading ? (
        <CuratedProjectsSkeletonGrid />
      ) : error ? (
        <VStack w="full" spacing={4} py={8}>
          <Body color="neutral1.11">{t('Failed to load curated projects')}</Body>
          {retry ? (
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={() => retry()}>
              {t('Retry')}
            </Button>
          ) : null}
        </VStack>
      ) : (
        <>
          {activeCategory === 'featured' && projectNames && <FeaturedProjectsList projectNames={projectNames} />}

          {activeCategory !== 'featured' && projectRows.length > 0 && (
            <MonthlyTrendingProjectsList projectRows={projectRows} />
          )}

          {activeCategory === 'tools' && projectRows.length === 0 && (
            <VStack w="full" spacing={4} py={8}>
              <Body color="neutral1.11">{t('No tools found')}</Body>
            </VStack>
          )}

          {activeCategory !== 'featured' && activeCategory !== 'tools' && projectRows.length === 0 && (
            <VStack w="full" spacing={4} py={8}>
              <Body color="neutral1.11">{emptyStateMessage}</Body>
            </VStack>
          )}

          {activeCategory === 'featured' && projectNames?.length === 0 && (
            <VStack w="full" spacing={4} py={8}>
              <Body color="neutral1.11">{emptyStateMessage}</Body>
            </VStack>
          )}
        </>
      )}

      <HStack w="full" justifyContent="center" paddingTop={4}>
        <Button variant="outline" colorScheme="neutral1" size="lg" onClick={handleDiscoverMore}>
          {t('Discover more')}
        </Button>
      </HStack>
    </VStack>
  )
}

const CuratedProjectsSkeletonGrid = () => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {Array.from({ length: CURATED_PROJECTS_COUNT }).map((_, index) => (
        <LandingCardBaseSkeleton key={`curated-skeleton-${index}`} />
      ))}
    </SimpleGrid>
  )
}

const MonthlyTrendingProjectsList = ({ projectRows }: { projectRows: GlobalProjectLeaderboardRow[] }) => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {projectRows.map((projectRow) => (
        <MonthlyTrendingProjectItem key={projectRow.projectName} projectRow={projectRow} />
      ))}
    </SimpleGrid>
  )
}

const MonthlyTrendingProjectItem = ({ projectRow }: { projectRow: GlobalProjectLeaderboardRow }) => {
  const { t } = useTranslation()
  const { data, loading, error, refetch } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectRow.projectName,
      },
    },
    skip: !projectRow.projectName,
  })

  const project = data?.projectGet

  if (loading) {
    return <LandingCardBaseSkeleton />
  }

  if (error) {
    return (
      <VStack w="full" spacing={4} py={8}>
        <Body color="neutral1.11">{t('Failed to load curated project')}</Body>
        <Button size="sm" variant="outline" colorScheme="neutral1" onClick={() => refetch()}>
          {t('Retry')}
        </Button>
      </VStack>
    )
  }

  if (!project) {
    return null
  }

  return (
    <LandingProjectCard
      project={{
        ...project,
        contributionSummary: {
          contributionsTotal: projectRow.contributionsTotal,
          contributionsTotalUsd: projectRow.contributionsTotalUsd,
        },
      }}
      hideContributionContent={projectRow.contributionsTotalUsd <= 100}
      trendingAmountLabel={t('raised this month')}
    />
  )
}

const FeaturedProjectsList = ({ projectNames }: { projectNames: string[] }) => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {projectNames.map((projectName) => (
        <FeaturedProjectItem key={projectName} projectName={projectName} />
      ))}
    </SimpleGrid>
  )
}

const FeaturedProjectItem = ({ projectName }: { projectName: string }) => {
  const { t } = useTranslation()
  const { data, loading, error, refetch } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectName,
      },
    },
    skip: !projectName,
  })

  const project = data?.projectGet

  if (loading) {
    return <LandingCardBaseSkeleton />
  }

  if (error) {
    return (
      <VStack w="full" spacing={4} py={8}>
        <Body color="neutral1.11">{t('Failed to load curated project')}</Body>
        <Button size="sm" variant="outline" colorScheme="neutral1" onClick={() => refetch()}>
          {t('Retry')}
        </Button>
      </VStack>
    )
  }

  if (!project) {
    return null
  }

  return <LandingProjectCard project={project} />
}
