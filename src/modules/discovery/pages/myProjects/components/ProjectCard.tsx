import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsArrowUpRight } from 'react-icons/bs'
import { Link as RouterLink } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ProjectForProfilePageFragment } from '@/types'
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

  return (
    <Box width="100%" py={4}>
      <HStack spacing={4} alignItems="center" justifyContent="space-between">
        <HStack>
          {project.thumbnailImage && (
            <Image
              src={project.thumbnailImage}
              alt={project.title}
              boxSize="40px"
              borderRadius="lg"
              objectFit="cover"
            />
          )}
          <Body fontSize={'24px'} fontWeight={'bold'}>
            {project.title}
          </Body>
        </HStack>

        <Button
          variant={'soft'}
          as={RouterLink}
          to={getPath('project', project.name)}
          size="md"
          rightIcon={isMobile ? undefined : <BsArrowUpRight size={12} />}
        >
          {isMobile ? <BsArrowUpRight size={12} /> : t('Dashboard')}
        </Button>
      </HStack>
      <Direction minHeight="269px" mt={4} spacing={4} alignItems="stretch">
        <Contributions projectId={project.id} projectName={project.name} />
        {hasRewards && <Rewards projectId={project.id} />}
      </Direction>
    </Box>
  )
}

export default ProjectCard
