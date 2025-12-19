import { Box, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useAuthContext } from '@/context'
import { CreateProjectButton } from '@/modules/navigation/platformNavBar/components/CreateProjectButton.tsx'
import { Body } from '@/shared/components/typography'
import {
  DraftProjectsImageUrl,
  InactiveProjectsImageUrl,
  InReviewProjectsImageUrl,
  LiveProjectsImageUrl,
} from '@/shared/constants'
import { ProjectForMyProjectsFragment, ProjectStatus } from '@/types/index.ts'

import { useLastVisitedMyProjects } from '../../hooks/useLastVisited'
import { LaunchNewProjectBanner } from './components/LaunchNewProjectBanner.tsx'
import { ProjectCard } from './components/ProjectCard'
import { ProjectIFollowGrid } from './components/ProjectIFollowGrid'
import { useMyProjects } from './hooks/useMyProjects'

const ProjectGroupInfo = {
  [ProjectStatus.Active]: {
    title: t('Live Projects'),
    imageUrl: LiveProjectsImageUrl,
  },
  [ProjectStatus.Draft]: {
    title: t('Draft Projects'),
    imageUrl: DraftProjectsImageUrl,
  },
  [ProjectStatus.InReview]: {
    title: t('Review Projects'),
    imageUrl: InReviewProjectsImageUrl,
  },
  [ProjectStatus.Inactive]: {
    title: t('Inactive Projects'),
    imageUrl: InactiveProjectsImageUrl,
  },
}

export const MyProjects = () => {
  useLastVisitedMyProjects()

  const { user } = useAuthContext()
  const { activeProjects, inDraftProjects, inReviewProjects, inActiveProjects, isLoading } = useMyProjects(user?.id)

  const hasNoProjects =
    activeProjects.length === 0 &&
    inDraftProjects.length === 0 &&
    inReviewProjects.length === 0 &&
    inActiveProjects.length === 0

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

            <ProjectGroup projects={activeProjects} status={ProjectStatus.Active} />

            <ProjectGroup projects={inDraftProjects} status={ProjectStatus.Draft} />

            <ProjectGroup projects={inReviewProjects} status={ProjectStatus.InReview} />

            <ProjectGroup projects={inActiveProjects} status={ProjectStatus.Inactive} />
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

const ProjectGroup = ({ projects, status }: { projects: ProjectForMyProjectsFragment[]; status: ProjectStatus }) => {
  if (projects.length === 0) {
    return null
  }

  const { title, imageUrl } = ProjectGroupInfo[status as keyof typeof ProjectGroupInfo]

  const isActive = status === ProjectStatus.Active

  return (
    <VStack align="stretch" mt={4} spacing={2}>
      <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <HStack>
          <HStack>
            <Image src={imageUrl} alt={title} width="60px" height="auto" />
            <Body size="2xl" bold>
              {title}
            </Body>
          </HStack>
          {isActive && (
            <Body size="2xl" muted>
              ({t('Past week')})
            </Body>
          )}
        </HStack>
        {isActive && <CreateProjectButton />}
      </HStack>

      {projects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
    </VStack>
  )
}

const ProjectCardSkeleton = () => {
  return (
    <Box width="100%" py={4} minHeight="269px">
      <HStack spacing={4} alignItems="center" justifyContent="space-between">
        <HStack>
          <Skeleton width="40px" height="40px" borderRadius="lg" />
          <Skeleton height="24px" width="150px" />
        </HStack>
        <Skeleton height="30px" width="100px" />
      </HStack>
      <VStack align="stretch" mt={4} spacing={2}>
        <Skeleton height="200px" width="100%" />
      </VStack>
    </Box>
  )
}
