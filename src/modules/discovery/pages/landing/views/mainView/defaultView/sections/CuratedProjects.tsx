import { Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchFeaturedProject } from '@/api/airtable.ts'
import { Body } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import {
  ProjectCategory,
  ProjectsMostFundedByCategoryRange,
  useFeaturedProjectForLandingPageQuery,
  useProjectsMostFundedByCategoryQuery,
} from '@/types/index.ts'

import { CuratedProjectCard } from '../components/CuratedProjectCard.tsx'
import { FeatureAirtableData, FeaturedAirtableResponse } from './Featured.tsx'

type CategoryKey = 'featured' | 'education' | 'culture' | 'causes' | 'productLaunches'

type CategoryButton = {
  key: CategoryKey
  label: string
  emoji: string
}

const CATEGORY_BUTTONS: CategoryButton[] = [
  { key: 'featured', label: 'Featured', emoji: '⭐' },
  { key: 'education', label: 'Education', emoji: '🎓' },
  { key: 'culture', label: 'Culture', emoji: '🎨' },
  { key: 'causes', label: 'Causes', emoji: '🤝' },
  { key: 'productLaunches', label: 'Product launches', emoji: '🚀' },
]

const CATEGORY_COPY: Record<CategoryKey, string> = {
  featured: 'Support promising and curated projects',
  education: 'Support Bitcoin education initiatives around the world',
  culture: 'Support Bitcoin culture such as music, film and games',
  causes: 'Support promising and curated projects',
  productLaunches: 'Discover and buy Bitcoin collectibles and unique items',
}

export const CuratedProjects = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('featured')
  const [featuredProjectNames, setFeaturedProjectNames] = useState<string[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  const inactiveBg = useColorModeValue('white', 'gray.700')
  const activeBg = useColorModeValue('gray.100', 'gray.600')
  const inactiveShadow = useColorModeValue('md', '0 4px 6px rgba(255, 255, 255, 0.1)')
  const activeShadow = useColorModeValue('lg', '0 10px 15px rgba(255, 255, 255, 0.15)')
  const hoverShadow = useColorModeValue('lg', '0 10px 15px rgba(255, 255, 255, 0.15)')

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

  const { data: causesData, loading: causesLoading } = useProjectsMostFundedByCategoryQuery({
    skip: activeCategory !== 'causes',
    variables: {
      input: {
        take: 6,
        range: ProjectsMostFundedByCategoryRange.Week,
        category: ProjectCategory.Cause,
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

    if (activeCategory === 'causes') {
      const projects = causesData?.projectsMostFundedByCategory?.[0]?.projects.map((p) => p.project) || []
      return { projects, loading: causesLoading }
    }

    if (activeCategory === 'productLaunches') {
      return { projects: [], loading: false }
    }

    return { projects: [], loading: false }
  }

  const { projects, projectNames, loading } = getCategoryProjects()

  const handleDiscoverMore = () => {
    navigate(getPath('discoveryFundraisers'))
  }

  return (
    <VStack w="full" spacing={8} alignItems="start">
      <HStack spacing={3} flexWrap="wrap" justifyContent="center" w="full">
        {CATEGORY_BUTTONS.map((button) => (
          <Button
            key={button.key}
            size="xl"
            variant="ghost"
            onClick={() => setActiveCategory(button.key)}
            leftIcon={<span>{button.emoji}</span>}
            bg={activeCategory === button.key ? activeBg : inactiveBg}
            boxShadow={activeCategory === button.key ? activeShadow : inactiveShadow}
            _hover={{
              boxShadow: hoverShadow,
            }}
          >
            {button.label}
          </Button>
        ))}
      </HStack>

      <Body size="2xl" medium>
        {CATEGORY_COPY[activeCategory]}
      </Body>

      {loading ? (
        <Body>{t('Loading...')}</Body>
      ) : (
        <>
          {activeCategory === 'featured' && projectNames && <FeaturedProjectsList projectNames={projectNames} />}

          {activeCategory !== 'featured' && activeCategory !== 'productLaunches' && projects && (
            <SimpleGrid w="full" columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
              {projects.map((project) => (
                <CuratedProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>
          )}

          {activeCategory === 'productLaunches' && (
            <VStack w="full" spacing={4} py={8}>
              <Body color="neutral1.11">{t('Product launches coming soon')}</Body>
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
    <SimpleGrid w="full" columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
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

  return <CuratedProjectCard project={project} />
}
