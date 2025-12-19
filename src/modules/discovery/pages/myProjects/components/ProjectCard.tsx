import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCheckCircle, PiClock, PiEyeglasses, PiGear, PiNotePencil, PiXCircle } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { getProjectCreationRoute } from '@/modules/project/pages/projectCreation/components/ProjectCreationNavigation.tsx'
import { FOLLOWERS_NEEDED } from '@/modules/project/pages/projectView/views/body/components/PrelaunchFollowButton.tsx'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ProjectPrelaunchStatus } from '@/shared/molecules/ProjectPrelaunchStatus.tsx'
import { ProjectForMyProjectsFragment, ProjectStatus } from '@/types'
import { useMobileMode } from '@/utils'

import { inDraftStatus } from '../hooks/useMyProjects.ts'
import { Contributions } from './Contributions'
import { Rewards } from './Rewards'

interface ProjectCardProps {
  project: ProjectForMyProjectsFragment
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const hasRewards = project.rewardsCount && project.rewardsCount > 0

  const Direction = isMobile ? VStack : HStack

  const isDraft = project.status && inDraftStatus.includes(project.status)

  const draftRediredirectPath = getProjectCreationRoute(project.lastCreationStep, project.id)

  const renderProjectCardContent = () => {
    if (project.status === ProjectStatus.PreLaunch) {
      return (
        <Direction mt={4} spacing={4} alignItems="stretch">
          <InPrelaunchProjectCard project={project} />
        </Direction>
      )
    }

    if (isDraft) {
      return (
        <Direction mt={4} spacing={4} alignItems="stretch">
          <InDraftProjectCard project={project} />
        </Direction>
      )
    }

    if (project.status === ProjectStatus.InReview) {
      return (
        <Direction mt={4} spacing={4} alignItems="stretch">
          <InReviewProjectCard />
        </Direction>
      )
    }

    if (project.status === ProjectStatus.Inactive) {
      return (
        <Direction mt={4} spacing={4} alignItems="stretch">
          <InactiveProjectCard project={project} />
        </Direction>
      )
    }

    return (
      <Direction mt={4} spacing={4} alignItems="stretch">
        <Contributions project={project} />
        {hasRewards ? <Rewards projectId={project.id} projectName={project.name} /> : null}
      </Direction>
    )
  }

  return (
    <Box width="100%" py={4}>
      <HStack spacing={4} justifyContent="space-between" alignItems="end">
        <HStack as={RouterLink} to={getPath('project', project.name)} alignItems="center">
          {project.thumbnailImage && (
            <Image
              src={project.thumbnailImage}
              alt={project.title}
              boxSize="20px"
              borderRadius="md"
              objectFit="cover"
            />
          )}
          <Body size="lg" bold>
            {project.title}
          </Body>
        </HStack>
        {isDraft ? (
          <Button
            variant={'soft'}
            colorScheme="neutral1"
            as={RouterLink}
            to={draftRediredirectPath}
            size="md"
            leftIcon={isMobile ? undefined : <PiNotePencil size={16} />}
          >
            {isMobile ? <PiNotePencil size={16} /> : t('Update & launch')}
          </Button>
        ) : (
          <Button
            variant={'soft'}
            colorScheme="neutral1"
            as={RouterLink}
            to={getPath('dashboardAnalytics', project.name)}
            size="md"
            leftIcon={isMobile ? undefined : <PiGear size={16} />}
          >
            {isMobile ? <PiGear size={16} /> : t('Dashboard')}
          </Button>
        )}
      </HStack>
      {renderProjectCardContent()}
    </Box>
  )
}

const InDraftProjectCard = ({ project }: { project: ProjectForMyProjectsFragment }) => {
  const { t } = useTranslation()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderWidth={1}
      borderRadius="lg"
      minHeight="124px"
      gap={2}
      p={4}
      flex={1}
    >
      {project.status === ProjectStatus.InReview ? (
        <>
          <HStack justifyContent="center" alignItems="center" spacing={2} color="info.10">
            <PiEyeglasses size={24} />
            <Body size={'lg'} regular>
              {t('Under Review')}
            </Body>
          </HStack>
          <Body size={'md'} regular textAlign="center">
            {t(
              "Your project is currently being reviewed by our team. You'll be notified via email once the review is complete.",
            )}
          </Body>
        </>
      ) : project.status === ProjectStatus.Accepted ? (
        <>
          <HStack justifyContent="center" alignItems="center" spacing={2} color="primary1.10">
            <PiCheckCircle size={24} />
            <Body size={'lg'} regular>
              {t('Approved')}
            </Body>
          </HStack>
          <Body size={'md'} regular textAlign="center">
            {t(
              'Great news! Your project has been approved. Launch it now to start receiving contributions and make it visible to the community.',
            )}
          </Body>
        </>
      ) : (
        <>
          <HStack justifyContent="center" alignItems="center" spacing={2} color="warning.10">
            <PiNotePencil size={24} />
            <Body size={'lg'} regular>
              {t('In Progress')}
            </Body>
          </HStack>
          <Body size={'md'} regular textAlign="center">
            {t(
              "Your project is in progress. Complete the remaining details and launch it when you're ready to go live and start accepting contributions.",
            )}
          </Body>
        </>
      )}
    </Box>
  )
}

const InReviewProjectCard = () => {
  const { t } = useTranslation()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderWidth={1}
      borderRadius="lg"
      minHeight="124px"
      gap={2}
      p={4}
      flex={1}
    >
      <HStack justifyContent="center" alignItems="center" spacing={2}>
        <PiEyeglasses size={24} />
        <Body size={'lg'} regular>
          {t('In review')}
        </Body>
      </HStack>
      <Body size={'md'} regular>
        {t('Your project is in review and therefore cannot receive contributions, and is not visible by the public. ')}
      </Body>
    </Box>
  )
}

const InPrelaunchProjectCard = ({ project }: { project: ProjectForMyProjectsFragment }) => {
  const { t } = useTranslation()

  const { followersCount } = project
  const followersNeeded = FOLLOWERS_NEEDED - (followersCount ?? 0)
  const enoughFollowers = followersNeeded <= 0

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderWidth={1}
      borderRadius="lg"
      minHeight="124px"
      gap={2}
      p={4}
      flex={1}
    >
      <HStack justifyContent="center" alignItems="center" spacing={2}>
        <PiClock size={24} />
        <Body size={'lg'} regular>
          {t('Prelaunch')}
        </Body>
      </HStack>
      <HStack>
        <Body size="2xl" bold dark>
          {followersCount ?? 0}{' '}
          <Body as="span" size="md" light medium>
            {t('followers')}
          </Body>
        </Body>

        {!enoughFollowers && (
          <Body size="2xl" dark bold display="inline">
            {`${followersNeeded}`}{' '}
            <Body as="span" size="md" light>
              {t(`more to launch`)}
            </Body>
          </Body>
        )}
      </HStack>
      <ProjectPrelaunchStatus project={project} onlyTimeLeft />
    </Box>
  )
}

const InactiveProjectCard = ({ project }: { project: ProjectForMyProjectsFragment }) => {
  const { t } = useTranslation()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderWidth={1}
      borderRadius="lg"
      minHeight="124px"
      gap={2}
      p={4}
      flex={1}
    >
      <HStack justifyContent="center" alignItems="center" spacing={2} color="error.10">
        <PiXCircle size={24} />
        <Body size={'lg'} regular>
          {t('Inactive')}
        </Body>
      </HStack>
      <Body size={'md'} regular textAlign="center">
        {t(
          'Your project is inactive and cannot receive contributions, You can reactivate it in the project dashboard.',
        )}
      </Body>
    </Box>
  )
}
