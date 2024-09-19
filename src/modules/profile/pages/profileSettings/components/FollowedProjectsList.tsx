import { Button, HStack, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { Project } from '@/types'

import { useFollowedProjects } from '../hooks/useFollowedProjects'

export const FollowedProjectsList = () => {
  const { t } = useTranslation()

  const { followedProjects: initialProjects } = useFollowedProjects()

  const [projects, setProjects] = useState(initialProjects)

  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  const handleUnfollow = useCallback((projectId: string) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId))
  }, [])

  if (projects.length === 0) {
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
        <VStack w="full" alignItems="flex-start" spacing={4}>
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <FollowedProjectItem project={project} onUnfollow={handleUnfollow} />
              </motion.div>
            ))}
          </AnimatePresence>
        </VStack>
      </VStack>
    </VStack>
  )
}

const FollowedProjectItem = ({
  project,
  onUnfollow,
}: {
  project: Project
  onUnfollow: (projectId: string) => void
}) => {
  const { t } = useTranslation()
  const { unfollowProject } = useFollowedProjects()

  const handleUnfollow = () => {
    unfollowProject(project.id)
    onUnfollow(project.id)
  }

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <HStack justifyContent="flex-start" alignItems="center" as={Link} to={getPath('project', project.name)}>
        <ImageWithReload src={project.thumbnailImage} w="40px" h="40px" borderRadius="md" />
        <Body size="md" medium>
          {project.name}
        </Body>
      </HStack>
      <Button colorScheme="primary1" size="md" onClick={handleUnfollow}>
        {t('Unfollow')}
      </Button>
    </HStack>
  )
}
