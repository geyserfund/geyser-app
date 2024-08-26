import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiEyeglasses, PiNoteBlank, PiProjectorScreenChart } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ProjectForProfilePageFragment, ProjectStatus } from '@/types'
import { useMobileMode } from '@/utils'

import Contributions from './Contributions'
import Rewards from './Rewards'

interface ProjectCardProps {
  project: ProjectForProfilePageFragment
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const hasRewards = project.rewardsCount && project.rewardsCount > 0

  const Direction = isMobile ? VStack : HStack

  const renderProjectCardContent = () => {
    if (project.status === ProjectStatus.Draft) {
      return (
        <Direction mt={4} spacing={4} alignItems="stretch">
          <InDraftProjectCard />
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

    return (
      <Direction minHeight="269px" mt={4} spacing={4} alignItems="stretch">
        <Contributions projectId={project.id} projectName={project.name} />
        {hasRewards ? <Rewards projectId={project.id} projectName={project.name} /> : null}
      </Direction>
    )
  }

  return (
    <Box width="100%" py={4}>
      <HStack spacing={4} alignItems="center" justifyContent="space-between">
        <HStack as={RouterLink} to={getPath('project', project.name)}>
          {project.thumbnailImage && (
            <Image
              src={project.thumbnailImage}
              alt={project.title}
              boxSize="40px"
              borderRadius="lg"
              objectFit="cover"
            />
          )}
          <Body size="2xl" bold>
            {project.title}
          </Body>
        </HStack>

        <Button
          variant={'soft'}
          colorScheme="neutral1"
          as={RouterLink}
          to={getPath('dashboardAnalytics', project.name)}
          size="md"
          rightIcon={isMobile ? undefined : <PiProjectorScreenChart size={16} />}
        >
          {isMobile ? <PiProjectorScreenChart size={16} /> : t('Analytics')}
        </Button>
      </HStack>
      {renderProjectCardContent()}
    </Box>
  )
}

export default ProjectCard

const InDraftProjectCard = () => {
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
        <PiNoteBlank size={24} />
        <Body size={'lg'} regular>
          {t('Draft')}
        </Body>
      </HStack>
      <Body size={'md'} regular>
        {t(
          "Your project is not visible to the public and cannot receive contributions. Click Publish when you're ready to go live.",
        )}
      </Body>
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
