import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useUserProfileAtom } from '@/modules/profile/state'
import { H1 } from '@/shared/components/typography'
import { useNotification } from '@/utils'

import { ProjectForProfilePageFragment, useUserFollowedProjectsQuery } from '../../../../../../../types'
import { ProfileProjectCard } from '../components/ProfileProjectCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

export const ProfileFollowed = () => {
  const toast = useNotification()
  const { userProfile } = useUserProfileAtom()

  const { data, loading } = useUserFollowedProjectsQuery({
    variables: {
      where: {
        id: userProfile.id,
      },
    },
    skip: !userProfile.id,

    onError(error) {
      toast.error({
        title: 'Failed to fetch projects',
        description: `${error.message}`,
      })
    },
  })

  const projects = (data?.user.projectFollows || []) as ProjectForProfilePageFragment[]

  if (loading) {
    return <TabPanelSkeleton />
  }

  return (
    <VStack w="full" spacing={4} alignItems="start">
      <H1 size="2xl" bold display={{ base: 'unset', lg: 'none' }}>
        {t('Followed projects')}
      </H1>
      {projects.map((project, index) => {
        return (
          <ProfileProjectCard
            showFollow
            key={project.id}
            project={project}
            _hover={{ backgroundColor: 'neutral.50', cursor: 'pointer', transition: 'background-color 0.2s' }}
          />
        )
      })}
    </VStack>
  )
}
