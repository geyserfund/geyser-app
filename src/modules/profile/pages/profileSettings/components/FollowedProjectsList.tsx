import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ImageWithReload } from '@/components/ui'
import { Body } from '@/shared/components/typography'
import { Project } from '@/types'

import { useFollowedProjects } from '../hooks/useFollowedProjects'

export const FollowedProjectsList = () => {
  const { followedProjects } = useFollowedProjects()
  const { t } = useTranslation()
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
        {followedProjects.map((project) => (
          <FollowedProjectItem key={project.id} project={project} />
        ))}
      </VStack>
    </VStack>
  )
}

const FollowedProjectItem = ({ project }: { project: Project }) => {
  const { t } = useTranslation()
  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <HStack justifyContent="flex-start" alignItems="center">
        <ImageWithReload src={project.thumbnailImage} w="40px" h="40px" borderRadius="md" />
        <Body size="md" medium>
          {project.name}
        </Body>
      </HStack>
      <Button>{t('Unfollow')}</Button>
    </HStack>
  )
}
