import { Box, Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { LandingCardBaseSkeleton } from '@/shared/components/layouts/index.ts'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import { type GlobalProjectLeaderboardRow } from '@/types/index.ts'

import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { LandingProjectCardProject } from '../../../../graphql/landingPageTypes.ts'

export type CategoryKey = 'featured' | 'education' | 'culture' | 'community' | 'tools'

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

type CuratedProjectsProps = {
  activeCategory: CategoryKey
  categoryError?: boolean
  categoryLoading?: boolean
  categoryProjectRows?: GlobalProjectLeaderboardRow[]
  categoryProjects?: LandingProjectCardProject[]
  featuredError?: boolean
  featuredLoading?: boolean
  featuredProjects?: LandingProjectCardProject[]
  onCategoryChange: (category: CategoryKey) => void
  onRetryCategory?: () => void
  onRetryFeatured?: () => void
}

export const CuratedProjects = ({
  activeCategory,
  categoryError,
  categoryLoading,
  categoryProjectRows = [],
  categoryProjects = [],
  featuredError,
  featuredLoading,
  featuredProjects = [],
  onCategoryChange,
  onRetryCategory,
  onRetryFeatured,
}: CuratedProjectsProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

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

  const getCategoryProjects = () => {
    if (activeCategory === 'featured') {
      return {
        emptyStateMessage: t('No featured projects found'),
        error: featuredError,
        loading: featuredLoading,
        projects: featuredProjects,
        retry: onRetryFeatured,
      }
    }

    return {
      emptyStateMessage: activeCategory === 'tools' ? t('No tools found') : t('No projects found'),
      error: categoryError,
      loading: categoryLoading,
      projectRows: categoryProjectRows,
      projects: categoryProjects,
      retry: onRetryCategory,
    }
  }

  const { projectRows = [], projects = [], loading, error, retry, emptyStateMessage } = getCategoryProjects()

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
              onClick={() => onCategoryChange(button.key)}
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
          {activeCategory === 'featured' && <FeaturedProjectsList projects={projects} />}

          {activeCategory !== 'featured' && projectRows.length > 0 && (
            <MonthlyTrendingProjectsList projectRows={projectRows} projects={projects} />
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

          {activeCategory === 'featured' && projects.length === 0 && (
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

const MonthlyTrendingProjectsList = ({
  projectRows,
  projects,
}: {
  projectRows: GlobalProjectLeaderboardRow[]
  projects: LandingProjectCardProject[]
}) => {
  const projectByName = new Map(projects.map((project) => [project.name, project]))

  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {projectRows.flatMap((projectRow) => {
        const project = projectByName.get(projectRow.projectName)

        if (!project) {
          return []
        }

        return [<MonthlyTrendingProjectItem key={projectRow.projectName} project={project} projectRow={projectRow} />]
      })}
    </SimpleGrid>
  )
}

const MonthlyTrendingProjectItem = ({
  project,
  projectRow,
}: {
  project: LandingProjectCardProject
  projectRow: GlobalProjectLeaderboardRow
}) => {
  const { t } = useTranslation()

  return (
    <LandingProjectCard
      project={{
        ...project,
        contributionSummary: {
          contributionsTotal: projectRow.contributionsTotal,
          contributionsTotalUsd: projectRow.contributionsTotalUsd,
        },
      }}
      trendingAmountLabel={t('raised this month')}
    />
  )
}

const FeaturedProjectsList = ({ projects }: { projects: LandingProjectCardProject[] }) => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {projects.map((project) => (
        <LandingProjectCard key={project.name} project={project} />
      ))}
    </SimpleGrid>
  )
}
