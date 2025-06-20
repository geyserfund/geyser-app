import { Button, HStack, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useFollowedProjectsValue } from '@/modules/auth/state'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useFollowProject } from '@/shared/hooks/graphqlState'
import { Project } from '@/types'

export const FollowedProjectsList = () => {
  const { t } = useTranslation()

  const followedProjects = useFollowedProjectsValue()

  if (followedProjects.length === 0) {
    return null
  }

  return (
    <VStack w="full" alignItems="flex-start">
      <Body size="lg" bold>
        {t('Projects I follow')}
      </Body>
      <VStack w="full" alignItems="flex-start" p={3}>
        <Body size="sm" light>
          {t('You will receive project updates regarding the projects that you follow. ')}
        </Body>
        <VStack w="full" alignItems="flex-start" spacing={0}>
          <AnimatePresence>
            {followedProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <FollowedProjectItem project={project as Project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </VStack>
      </VStack>
    </VStack>
  )
}

const FollowedProjectItem = ({ project }: { project: Project }) => {
  const { t } = useTranslation()
  const { handleUnFollow, unfollowLoading } = useFollowProject(project)

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center" pt={2} pb={2}>
      <HStack justifyContent="flex-start" alignItems="center" as={Link} to={getPath('project', project.name)}>
        <ImageWithReload
          src={project.thumbnailImage}
          alt={`${project.name} project thumbnail image`}
          w="40px"
          h="40px"
          borderRadius="md"
        />
        <Body size="md" medium>
          {project.name}
        </Body>
      </HStack>
      <Button colorScheme="primary1" size="md" onClick={handleUnFollow} isLoading={unfollowLoading}>
        {t('Unfollow')}
      </Button>
    </HStack>
  )
}
