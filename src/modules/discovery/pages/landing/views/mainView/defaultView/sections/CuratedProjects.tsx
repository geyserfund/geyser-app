import { Button, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { LandingCardBaseSkeleton } from '@/shared/components/layouts/index.ts'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'

import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { LandingProjectCardProject } from '../../../../graphql/landingPageTypes.ts'

const CURATED_PROJECTS_COUNT = 6

type CuratedProjectsProps = {
  featuredError?: boolean
  featuredLoading?: boolean
  featuredProjects?: LandingProjectCardProject[]
  onRetryFeatured?: () => void
}

export const CuratedProjects = ({
  featuredError,
  featuredLoading,
  featuredProjects = [],
  onRetryFeatured,
}: CuratedProjectsProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleDiscoverMore = () => {
    navigate(getPath('discoveryCircularGrantProjects'))
  }

  return (
    <VStack w="full" spacing={8} alignItems="start">
      <H3 size={{ base: 'md', lg: '2xl' }} dark bold>
        {t('Featured Circular Grants')}
      </H3>

      {featuredLoading ? (
        <CuratedProjectsSkeletonGrid />
      ) : featuredError ? (
        <VStack w="full" spacing={4} py={8}>
          <Body color="neutral1.11">{t('Failed to load curated projects')}</Body>
          {onRetryFeatured ? (
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={() => onRetryFeatured()}>
              {t('Retry')}
            </Button>
          ) : null}
        </VStack>
      ) : (
        <>
          {featuredProjects.length > 0 ? <FeaturedProjectsList projects={featuredProjects} /> : null}
          {featuredProjects.length === 0 && (
            <VStack w="full" spacing={4} py={8}>
              <Body color="neutral1.11">{t('No featured projects found')}</Body>
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

const FeaturedProjectsList = ({ projects }: { projects: LandingProjectCardProject[] }) => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {projects.map((project) => (
        <LandingProjectCard key={project.name} project={project} />
      ))}
    </SimpleGrid>
  )
}
