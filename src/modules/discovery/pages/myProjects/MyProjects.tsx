import { Box, Button, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocket } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { Body } from '@/shared/components/typography'
import { DiamondUrl, getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import ProjectCard from './components/ProjectCard'
import { ProjectIFollowGrid } from './components/ProjectIFollowGrid'
import { useMyProjects } from './hooks/useMyProjects'

export const MyProjects = () => {
  const { t } = useTranslation()

  const { user } = useAuthContext()
  const { activeProjects, inDraftProjects, inReviewProjects, isLoading } = useMyProjects(user?.id)

  const hasNoProjects = activeProjects.length === 0 && inDraftProjects.length === 0 && inReviewProjects.length === 0

  return (
    <>
      <VStack spacing={6} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body size="2xl" bold width={{ base: '100%', lg: 'auto' }}>
            {t('My Projects')}
          </Body>
        </Box>
        {isLoading ? (
          <>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </>
        ) : (
          <>
            {hasNoProjects && <LaunchNewProjectBanner />}
            {activeProjects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
            {inReviewProjects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
            {inDraftProjects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
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
      <HStack justifyContent="flex-start" spacing={8}>
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

export const ProjectCardSkeleton = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <HStack spacing={4}>
        <Skeleton width="100px" height="100px" />
        <VStack align="stretch" flex={1}>
          <Skeleton height="20px" width="60%" />
          <Skeleton height="16px" width="40%" />
          <Skeleton height="16px" width="80%" />
        </VStack>
      </HStack>
    </Box>
  )
}
