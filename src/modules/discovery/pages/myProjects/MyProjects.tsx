import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'

import { useAuthContext } from '@/context'
import { CreateProjectButton } from '@/modules/navigation/platformNavBar/components/CreateProjectButton.tsx'
import { Body } from '@/shared/components/typography'
import { ProjectForMyProjectsFragment, ProjectReviewStatus, ProjectStatus } from '@/types/index.ts'

import { useLastVisitedMyProjects } from '../../hooks/useLastVisited'
import { LaunchNewProjectBanner } from './components/LaunchNewProjectBanner.tsx'
import { ProjectCard } from './components/ProjectCard'
import { ProjectIFollowGrid } from './components/ProjectIFollowGrid'
import { useMyProjects } from './hooks/useMyProjects'

export const MyProjects = () => {
  useLastVisitedMyProjects()

  const { user } = useAuthContext()
  const { activeProjects, inDraftProjects, inReviewProjects, inActiveProjects, isLoading } = useMyProjects(user?.id)

  /** Sort and combine all projects into a single list */
  const sortedProjects = useMemo(() => {
    const allProjects = [...activeProjects, ...inReviewProjects, ...inDraftProjects, ...inActiveProjects]

    // Custom sort order: Active > InReview/RevisionsRequested > Draft > Inactive > Closed
    return allProjects.sort((a, b) => {
      const getStatusPriority = (project: ProjectForMyProjectsFragment) => {
        if (project.status === ProjectStatus.Active) return 1
        if (project.status === ProjectStatus.InReview) {
          // Check if has revisions requested
          const latestReview =
            project.reviews && project.reviews.length > 0
              ? [...project.reviews].sort((x, y) => (y.version ?? 0) - (x.version ?? 0))[0]
              : undefined
          return latestReview?.status === ProjectReviewStatus.RevisionsRequested ? 2 : 3
        }

        if (project.status === ProjectStatus.Draft || project.status === ProjectStatus.Accepted) return 4
        if (project.status === ProjectStatus.Inactive) return 5
        if (project.status === ProjectStatus.Closed) return 6
        return 7
      }

      return getStatusPriority(a) - getStatusPriority(b)
    })
  }, [activeProjects, inReviewProjects, inDraftProjects, inActiveProjects])

  const hasNoProjects = sortedProjects.length === 0

  return (
    <>
      <VStack spacing={6} align="stretch">
        {isLoading ? (
          <>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </>
        ) : (
          <>
            {hasNoProjects && <LaunchNewProjectBanner />}

            {!hasNoProjects && (
              <>
                <HStack justifyContent="space-between" alignItems="center" width="100%">
                  <Body size="2xl" bold>
                    {t('My Projects')}
                  </Body>
                  <CreateProjectButton />
                </HStack>

                {sortedProjects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
              </>
            )}
          </>
        )}
      </VStack>
      {!isLoading && (
        <VStack spacing={6} align="stretch">
          <ProjectIFollowGrid />
        </VStack>
      )}
    </>
  )
}

const ProjectCardSkeleton = () => {
  return (
    <Box width="100%" py={4} minHeight="150px">
      <HStack spacing={4} alignItems="center" justifyContent="space-between">
        <HStack>
          <Skeleton width="20px" height="20px" borderRadius="md" />
          <Skeleton height="24px" width="200px" />
          <Skeleton height="20px" width="80px" borderRadius="full" />
        </HStack>
        <Skeleton height="36px" width="120px" />
      </HStack>
      <VStack align="stretch" mt={3} spacing={2}>
        <Skeleton height="16px" width="250px" />
        <Skeleton height="16px" width="300px" />
      </VStack>
    </Box>
  )
}
