import { Box, Button, HStack, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsArrowUpRight } from 'react-icons/bs'
import { Link as RouterLink } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ProjectForProfilePageFragment } from '@/types'

import Contributions from './Contributions'

interface ProjectCardProps {
  project: ProjectForProfilePageFragment
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation()

  return (
    <Box py={4}>
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
          rightIcon={<BsArrowUpRight size={12} />}
        >
          {t('Dashboard')}
        </Button>
      </HStack>
      <HStack mt={4} spacing={4}>
        <Contributions projectId={project.id} />
        <Contributions projectId={project.id} />
      </HStack>
    </Box>
  )
}

export default ProjectCard
