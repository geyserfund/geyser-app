import { Box, Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'

import { fetchFeaturedProject } from '@/api/airtable.ts'
import { LandingShowcaseProjectCard, LandingShowcaseProjectCardSkeleton } from '@/modules/discovery/pages/landing/components/LandingShowcaseProjectCard.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import {
  OrderByDirection,
  ProjectCategory,
  ProjectsGetWhereInputStatus,
  ProjectsMostFundedByCategoryRange,
  ProjectsOrderByField,
  ProjectSubCategory,
  useFeaturedProjectForLandingPageQuery,
  useProjectsForLandingPageQuery,
  useProjectsMostFundedByCategoryQuery,
} from '@/types/index.ts'

import type { ProjectForLandingPageFragment } from '@/types/index.ts'

type FeaturedProjectFieldRecord = {
  Featured_Comment?: string
  Name: string
  Type: string
}

type FeaturedProjectResponse = {
  records: Array<{
    fields: FeaturedProjectFieldRecord
  }>
}

type FeaturedProjectReference = {
  comment?: string
  name: string
}

type ShowcaseSlide = {
  ctaTo?: string
  description: string
  key: string
  label: string
  loading: boolean
  projects?: ProjectForLandingPageFragment[]
  title: string
  type: 'featured' | 'projects'
  featuredProjects?: FeaturedProjectReference[]
}

const FEATURED_PROJECT_LIMIT = 3
const AUTO_ROTATION_INTERVAL_MS = 9000

const useReducedMotionPreference = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

/** LandingProjectShowcaseCarousel rotates between featured and curated discovery views. */
export const LandingProjectShowcaseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProjectReference[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const prefersReducedMotion = useReducedMotionPreference()

  const educationQuery = useProjectsMostFundedByCategoryQuery({
    variables: {
      input: {
        take: FEATURED_PROJECT_LIMIT,
        range: ProjectsMostFundedByCategoryRange.Week,
        category: ProjectCategory.Education,
      },
    },
  })

  const humanitarianQuery = useProjectsMostFundedByCategoryQuery({
    variables: {
      input: {
        take: FEATURED_PROJECT_LIMIT,
        range: ProjectsMostFundedByCategoryRange.Week,
        subCategory: ProjectSubCategory.Humanitarian,
      },
    },
  })

  const causesQuery = useProjectsMostFundedByCategoryQuery({
    variables: {
      input: {
        take: FEATURED_PROJECT_LIMIT,
        range: ProjectsMostFundedByCategoryRange.Week,
        category: ProjectCategory.Cause,
      },
    },
  })

  const launchesQuery = useProjectsForLandingPageQuery({
    variables: {
      input: {
        orderBy: [
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.LaunchedAt,
          },
        ],
        where: {
          status: ProjectsGetWhereInputStatus.Active,
        },
        pagination: {
          take: FEATURED_PROJECT_LIMIT,
        },
      },
    },
  })

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const response = (await fetchFeaturedProject()) as FeaturedProjectResponse
        const nextProjects = response.records
          .map((record) => record.fields)
          .filter((record) => record.Type === 'project' && record.Name)
          .slice(0, FEATURED_PROJECT_LIMIT)
          .map((record) => ({
            name: record.Name,
            comment: record.Featured_Comment,
          }))

        setFeaturedProjects(nextProjects)
      } catch (error) {
        setFeaturedProjects([])
      } finally {
        setFeaturedLoading(false)
      }
    }

    void loadFeaturedProjects()
  }, [])

  const educationProjects = educationQuery.data?.projectsMostFundedByCategory?.[0]?.projects
    ?.map((item) => item.project)
    .slice(0, FEATURED_PROJECT_LIMIT)
  const humanitarianProjects = humanitarianQuery.data?.projectsMostFundedByCategory?.[0]?.projects
    ?.map((item) => item.project)
    .slice(0, FEATURED_PROJECT_LIMIT)
  const causesProjects = causesQuery.data?.projectsMostFundedByCategory?.[0]?.projects
    ?.map((item) => item.project)
    .slice(0, FEATURED_PROJECT_LIMIT)
  const productLaunchProjects = launchesQuery.data?.projectsGet.projects?.slice(0, FEATURED_PROJECT_LIMIT)

  const slides = useMemo(() => {
    const nextSlides = [
      featuredLoading || featuredProjects.length
        ? {
            key: 'featured',
            label: t('Featured'),
            title: t('Support promising and curated projects'),
            description: t('Hand-picked campaigns and fundraisers rotating on a timed carousel.'),
            type: 'featured' as const,
            featuredProjects,
            loading: featuredLoading,
          }
        : null,
      educationProjects?.length || educationQuery.loading
        ? {
            key: 'education',
            label: t('Education'),
            title: t('Trending in education'),
            description: t('Courses, creators, and community-led learning for the next wave of Bitcoiners.'),
            ctaTo: getPath('discoveryProjectCategory', ProjectCategory.Education),
            type: 'projects' as const,
            projects: educationProjects,
            loading: educationQuery.loading,
          }
        : null,
      humanitarianProjects?.length || humanitarianQuery.loading
        ? {
            key: 'humanitarian',
            label: t('Humanitarian'),
            title: t('Humanitarian projects gaining momentum'),
            description: t('Support urgent work helping communities adopt Bitcoin where it matters most.'),
            ctaTo: getPath('discoveryProjectSubCategory', ProjectSubCategory.Humanitarian),
            type: 'projects' as const,
            projects: humanitarianProjects,
            loading: humanitarianQuery.loading,
          }
        : null,
      causesProjects?.length || causesQuery.loading
        ? {
            key: 'causes',
            label: t('Causes'),
            title: t('Causes worth backing'),
            description: t('From advocacy to relief efforts, discover direct ways to contribute with Bitcoin.'),
            ctaTo: getPath('discoveryProjectCategory', ProjectCategory.Cause),
            type: 'projects' as const,
            projects: causesProjects,
            loading: causesQuery.loading,
          }
        : null,
      productLaunchProjects?.length || launchesQuery.loading
        ? {
            key: 'product-launches',
            label: t('Product launches'),
            title: t('Recently launched Bitcoin products'),
            description: t('Fresh launches from builders shipping tools, hardware, and products on Geyser.'),
            ctaTo: getPath('discoveryLaunchpad'),
            type: 'projects' as const,
            projects: productLaunchProjects,
            loading: launchesQuery.loading,
          }
        : null,
    ].filter(Boolean) as ShowcaseSlide[]

    return nextSlides
  }, [
    causesProjects,
    causesQuery.loading,
    educationProjects,
    educationQuery.loading,
    featuredLoading,
    featuredProjects,
    humanitarianProjects,
    humanitarianQuery.loading,
    launchesQuery.loading,
    productLaunchProjects,
  ])

  useEffect(() => {
    if (activeIndex <= slides.length - 1) {
      return
    }

    setActiveIndex(0)
  }, [activeIndex, slides.length])

  useEffect(() => {
    if (prefersReducedMotion || isPaused || slides.length < 2) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, AUTO_ROTATION_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [isPaused, prefersReducedMotion, slides.length])

  const backgroundColor = useColorModeValue('#fbfaf7', 'gray.900')
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const activeSlide = slides[activeIndex]

  if (!activeSlide) {
    return null
  }

  return (
    <VStack
      id="landing-showcase"
      width="100%"
      align="stretch"
      spacing={6}
      padding={{ base: 6, lg: 8 }}
      borderRadius="36px"
      backgroundColor={backgroundColor}
      border="1px solid"
      borderColor={borderColor}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <VStack align="stretch" spacing={4}>
        <HStack spacing={2} flexWrap="wrap">
          {slides.map((slide, index) => (
            <Button
              key={slide.key}
              size="sm"
              borderRadius="full"
              variant={index === activeIndex ? 'solid' : 'outline'}
              colorScheme={index === activeIndex ? 'primary1' : 'neutral1'}
              onClick={() => setActiveIndex(index)}
            >
              {slide.label}
            </Button>
          ))}
        </HStack>

        <HStack align="end" justify="space-between" spacing={6} flexWrap="wrap">
          <VStack align="stretch" spacing={2} maxW="720px">
            <H2 size={{ base: 'xl', lg: '2xl' }} dark bold>
              {activeSlide.title}
            </H2>
            <Body color="neutral1.10" lineHeight={1.7}>
              {activeSlide.description}
            </Body>
          </VStack>

          {activeSlide.ctaTo ? (
            <Button as={Link} to={activeSlide.ctaTo} variant="outline" colorScheme="neutral1" borderRadius="full">
              {t('Discover more')}
            </Button>
          ) : null}
        </HStack>
      </VStack>

      <Box key={activeSlide.key}>
        {activeSlide.type === 'featured' ? (
          <LandingFeaturedProjectsGrid featuredProjects={activeSlide.featuredProjects || []} loading={activeSlide.loading} />
        ) : (
          <LandingProjectsGrid projects={activeSlide.projects || []} loading={activeSlide.loading} />
        )}
      </Box>
    </VStack>
  )
}

const LandingProjectsGrid = ({
  loading,
  projects,
}: {
  loading?: boolean
  projects: ProjectForLandingPageFragment[]
}) => {
  if (loading && projects.length === 0) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
        {Array.from({ length: FEATURED_PROJECT_LIMIT }).map((_, index) => (
          <LandingShowcaseProjectCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
      {projects.map((project) => (
        <LandingShowcaseProjectCard key={project.id} project={project} />
      ))}
    </SimpleGrid>
  )
}

const LandingFeaturedProjectsGrid = ({
  featuredProjects,
  loading,
}: {
  featuredProjects: FeaturedProjectReference[]
  loading?: boolean
}) => {
  if (loading && featuredProjects.length === 0) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
        {Array.from({ length: FEATURED_PROJECT_LIMIT }).map((_, index) => (
          <LandingShowcaseProjectCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
      {featuredProjects.map((featuredProject) => (
        <LandingFeaturedProjectCard
          key={featuredProject.name}
          comment={featuredProject.comment}
          projectName={featuredProject.name}
        />
      ))}
    </SimpleGrid>
  )
}

const LandingFeaturedProjectCard = ({ comment, projectName }: { comment?: string; projectName: string }) => {
  const { data, loading } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectName,
      },
    },
    skip: !projectName,
  })

  const project = data?.projectGet

  if (loading || !project) {
    return <LandingShowcaseProjectCardSkeleton />
  }

  return <LandingShowcaseProjectCard project={project} description={comment} />
}
