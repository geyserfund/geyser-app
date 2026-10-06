import { Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { LandingCardBaseSkeleton } from '@/shared/components/layouts/index.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { LandingProjectCardProject } from '../../../../graphql/landingPageTypes.ts'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

const CURATED_PROJECTS_COUNT = 3

type CuratedProjectsProps = {
  featuredError?: boolean
  featuredLoading?: boolean
  featuredProjects?: LandingProjectCardProject[]
  onRetryFeatured?: () => void
}

/** Landing section listing the curated Circular Grant projects with loading, error and empty states. */
export const CuratedProjects = ({
  featuredError,
  featuredLoading,
  featuredProjects = [],
  onRetryFeatured,
}: CuratedProjectsProps) => {
  const { t } = useTranslation()

  return (
    <ProjectRowLayout
      w="full"
      title={t('Live Circular Grants')}
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryCircularGrantProjects')} />}
    >
      {featuredLoading ? (
        <CuratedProjectsSkeletonGrid />
      ) : featuredError ? (
        <VStack w="full" alignItems="start" spacing={4} py={4}>
          <Body light>{t('Failed to load curated projects')}</Body>
          {onRetryFeatured ? (
            <Button size="md" variant="outline" colorScheme="neutral1" onClick={() => onRetryFeatured()}>
              {t('Retry')}
            </Button>
          ) : null}
        </VStack>
      ) : (
        <>
          {featuredProjects.length > 0 ? <FeaturedProjectsList projects={featuredProjects} /> : null}
          {featuredProjects.length === 0 && (
            <VStack w="full" alignItems="start" spacing={4} py={4}>
              <Body light>{t('No featured projects found')}</Body>
            </VStack>
          )}
        </>
      )}
    </ProjectRowLayout>
  )
}

const CuratedProjectsSkeletonGrid = () => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {Array.from({ length: CURATED_PROJECTS_COUNT }).map((_, index) => (
        <LandingCardBaseSkeleton key={`curated-skeleton-${index}`} />
      ))}
    </SimpleGrid>
  )
}

const FeaturedProjectsList = ({ projects }: { projects: LandingProjectCardProject[] }) => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
      {projects.map((project) => (
        <LandingProjectCard key={project.name} project={project} />
      ))}
    </SimpleGrid>
  )
}
