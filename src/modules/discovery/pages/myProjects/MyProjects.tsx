import { Box, Button, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocket } from 'react-icons/pi'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { CreateProjectButton } from '@/modules/navigation/platformNavBar/components/CreateProjectButton.tsx'
import { Body } from '@/shared/components/typography'
import { DiamondUrl, getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { useLastVisitedMyProjects } from '../../hooks/useLastVisited'
import { ProjectCard } from './components/ProjectCard'
import { ProjectIFollowGrid } from './components/ProjectIFollowGrid'
import { useMyProjects } from './hooks/useMyProjects'

export const MyProjects = () => {
  const { t } = useTranslation()

  useLastVisitedMyProjects()

  const { user } = useAuthContext()
  const { activeProjects, inDraftProjects, inReviewProjects, inPrelaunchProjects, isLoading } = useMyProjects(user?.id)

  const hasNoProjects =
    activeProjects.length === 0 &&
    inDraftProjects.length === 0 &&
    inReviewProjects.length === 0 &&
    inPrelaunchProjects.length === 0

  return (
    <>
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <HStack>
            <Body size="2xl" bold>
              {t('My Projects')}
            </Body>
            <Body size="2xl" muted>
              ({t('Past week')})
            </Body>
          </HStack>
          <CreateProjectButton />
        </HStack>
        {isLoading ? (
          <>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </>
        ) : (
          <>
            {hasNoProjects && <LaunchNewProjectBanner />}
            {inPrelaunchProjects.map((project) =>
              project ? <ProjectCard key={project.id} project={project} /> : null,
            )}
            {activeProjects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
            {inDraftProjects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
            {inReviewProjects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
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

const LaunchNewProjectBanner = () => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const Direction = isMobile ? VStack : HStack

  return (
    <Direction
      width="100%"
      justifyContent="space-between"
      bg="neutralAlpha.2"
      border="1px solid"
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      spacing={8}
      p={8}
    >
      <HStack width="100%" justifyContent="flex-start" spacing={8}>
        <Image height="86px" src={DiamondUrl} alt="Launch new project" />
        <VStack alignItems="flex-start">
          <Body size="xl" medium>
            {t('Launch your new project')}
          </Body>
          <Body size="sm">{t('Transform your idea into real world projects backed by your community.')}</Body>
        </VStack>
      </HStack>
      <Button
        as={Link}
        to={getPath('launchStart')}
        size="md"
        variant="solid"
        colorScheme="primary1"
        rightIcon={<PiRocket size="12px" />}
        width={{ base: '100%', lg: 'auto' }}
      >
        {t('Create project')}
      </Button>
    </Direction>
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
