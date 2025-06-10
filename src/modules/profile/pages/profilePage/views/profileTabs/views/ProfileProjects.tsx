import { Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CreateProjectButton } from '@/modules/navigation/platformNavBar/components/CreateProjectButton'
import { Body, H1 } from '@/shared/components/typography'
import { TelescopeUrl } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectForProfilePageFragment, ProjectStatus, useUserProfileProjectsQuery } from '../../../../../../../types'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'
import { CreateProject } from '../components/CreateProject'
import { ProfileProjectCard } from '../components/ProfileProjectCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

export const ProfileProjects = () => {
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()
  const toast = useNotification()

  const { userProfile } = useUserProfileAtom()

  const { data, loading } = useUserProfileProjectsQuery({
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

  if (loading) {
    return <TabPanelSkeleton />
  }

  const projects = (data?.user?.ownerOf?.map((val) => val?.project) || []) as ProjectForProfilePageFragment[]

  if (projects.length === 0 && isViewingOwnProfile) {
    return <CreateProject marginTop="20px" />
  }

  if (projects.length === 0) {
    return (
      <VStack w="full" p="20px" spacing="20px">
        <Image height="200px" src={TelescopeUrl} />
        <Body medium light>
          {t('No projects')}
        </Body>
      </VStack>
    )
  }

  const projectsToRender = projects.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
  return (
    <VStack w="full" alignItems={'start'}>
      <H1 size="2xl" bold display={{ base: 'unset', lg: 'none' }}>
        {t('Projects')}
      </H1>
      {isViewingOwnProfile && <CreateProjectButton width="full" />}
      {projectsToRender.map((project) => {
        if (
          !isViewingOwnProfile &&
          project.status !== ProjectStatus.Active &&
          project.status !== ProjectStatus.PreLaunch
        ) {
          return null
        }

        return (
          <ProfileProjectCard
            showStats
            showStatus
            key={project.id}
            project={project}
            _hover={{ backgroundColor: 'neutral.50', cursor: 'pointer', transition: 'background-color 0.2s' }}
          />
        )
      })}
    </VStack>
  )
}
