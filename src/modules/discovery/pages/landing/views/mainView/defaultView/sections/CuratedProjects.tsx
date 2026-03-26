import { Button, HStack, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchFeaturedProject } from '@/api/airtable.ts'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import {
  ProjectCategory,
  ProjectsMostFundedByCategoryRange,
  useFeaturedProjectForLandingPageQuery,
  useProjectsMostFundedByCategoryQuery,
} from '@/types/index.ts'

import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { FeatureAirtableData, FeaturedAirtableResponse } from './Featured.tsx'

type CategoryKey = 'featured' | 'education' | 'culture' | 'community' | 'tools'

type CategoryButton = {
  key: CategoryKey
  label: string
  emoji: string
}

const CATEGORY_BUTTONS: CategoryButton[] = [
  { key: 'featured', label: 'Featured', emoji: '⭐' },
  { key: 'education', label: 'Education', emoji: '🎓' },
  { key: 'culture', label: 'Culture', emoji: '🎨' },
  { key: 'community', label: 'Community', emoji: '🤝' },
  { key: 'tools', label: 'Tools', emoji: '🛠' },
]

const CATEGORY_COPY: Record<CategoryKey, string> = {
  featured: 'Support promising and curated projects',
  education: 'Support Bitcoin education initiatives around the world',
  culture: 'Support Bitcoin culture such as music, film and games',
  community: 'Support communities, meetups, and local Bitcoin initiatives',
  tools: 'Discover Bitcoin tools, apps, hardware, and open-source software',
}

export const CuratedProjects = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('featured')
  const [featuredProjectNames, setFeaturedProjectNames] = useState<string[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  const inactiveBg = useColorModeValue('utils.pbg', 'utils.surface')
  const activeBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const hoverBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const inactiveBorderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const activeBorderColor = useColorModeValue('neutral1.6', 'neutral1.7')
  const buttonTextColor = useColorModeValue('neutral1.11', 'neutral1.11')

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      setLoadingFeatured(true)
      try {
        const response: FeaturedAirtableResponse = await fetchFeaturedProject()
        const projectNames = response.records
          .map((record) => record.fields)
          .filter((data: FeatureAirtableData) => data.Type === 'project' && data.Name)
          .map((data: FeatureAirtableData) => data.Name)
          .slice(0, 6)

        setFeaturedProjectNames(projectNames)
      } catch (error) {
        console.error('Failed to fetch featured projects:', error)
      } finally {
        setLoadingFeatured(false)
      }
    }

    if (activeCategory === 'featured') {
      loadFeaturedProjects()
    }
  }, [activeCategory])

  const { data: educationData, loading: educationLoading } = useProjectsMostFundedByCategoryQuery({
    skip: activeCategory !== 'education',
    variables: {
      input: {
        take: 6,
        range: ProjectsMostFundedByCategoryRange.Week,
        category: ProjectCategory.Education,
      },
    },
  })

  const { data: cultureData, loading: cultureLoading } = useProjectsMostFundedByCategoryQuery({
    skip: activeCategory !== 'culture',
    variables: {
      input: {
        take: 6,
        range: ProjectsMostFundedByCategoryRange.Week,
        category: ProjectCategory.Culture,
      },
    },
  })

  const { data: communityData, loading: communityLoading } = useProjectsMostFundedByCategoryQuery({
    skip: activeCategory !== 'community',
    variables: {
      input: {
        take: 6,
        range: ProjectsMostFundedByCategoryRange.Week,
        category: ProjectCategory.Community,
      },
    },
  })

  const { data: toolsData, loading: toolsLoading } = useProjectsMostFundedByCategoryQuery({
    skip: activeCategory !== 'tools',
    variables: {
      input: {
        take: 6,
        range: ProjectsMostFundedByCategoryRange.Week,
        category: ProjectCategory.Tool,
      },
    },
  })

  const getCategoryProjects = () => {
    if (activeCategory === 'featured') {
      return { projectNames: featuredProjectNames, loading: loadingFeatured }
    }

    if (activeCategory === 'education') {
      const projects = educationData?.projectsMostFundedByCategory?.[0]?.projects.map((p) => p.project) || []
      return { projects, loading: educationLoading }
    }

    if (activeCategory === 'culture') {
      const projects = cultureData?.projectsMostFundedByCategory?.[0]?.projects.map((p) => p.project) || []
      return { projects, loading: cultureLoading }
    }

    if (activeCategory === 'community') {
      const projects = communityData?.projectsMostFundedByCategory?.[0]?.projects.map((p) => p.project) || []
      return { projects, loading: communityLoading }
    }

    if (activeCategory === 'tools') {
      const projects = toolsData?.projectsMostFundedByCategory?.[0]?.projects.map((p) => p.project) || []
      return { projects, loading: toolsLoading }
    }

    return { projects: [], loading: false }
  }

  const { projects = [], projectNames, loading } = getCategoryProjects()

  const handleDiscoverMore = () => {
    navigate(getPath('discoveryProjects'))
  }

  return (
    <VStack w="full" spacing={8} alignItems="start">
      <HStack
        spacing={3}
        flexWrap={{ base: 'nowrap', md: 'wrap' }}
        justifyContent={{ base: 'flex-start', md: 'center' }}
        overflowX={{ base: 'auto', md: 'visible' }}
        w="full"
        py={2}
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {CATEGORY_BUTTONS.map((button) => (
          <Button
            key={button.key}
            size="xl"
            height="56px"
            flexShrink={0}
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

      <H3 size={{ base: 'md', lg: '2xl' }} dark bold>
        {CATEGORY_COPY[activeCategory]}
      </H3>

      {loading ? (
        <Body>{t('Loading...')}</Body>
      ) : (
        <>
          {activeCategory === 'featured' && projectNames && <FeaturedProjectsList projectNames={projectNames} />}

          {activeCategory !== 'featured' && projects && projects.length > 0 && (
            <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
              {projects.map((project) => (
                <LandingProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>
          )}

          {activeCategory === 'tools' && projects.length === 0 && (
            <VStack w="full" spacing={4} py={8}>
              <Body color="neutral1.11">{t('No tools found')}</Body>
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
    return null
  }

  return <LandingProjectCard project={project} />
}
