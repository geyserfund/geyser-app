import { Button, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '@/modules/profile/state'
import { Body, H1 } from '@/shared/components/typography'
import { FollowAProjectUrl, getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectForProfilePageFragment, useUserFollowedProjectsQuery } from '../../../../../../../types'
import { ProfileProjectCard } from '../components/ProfileProjectCard'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

export const ProfileFollowed = () => {
  const toast = useNotification()
  const { userProfile } = useUserProfileAtom()
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

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
      {projects.length === 0 && (
        <VStack w="full" p={6} spacing={6}>
          {isViewingOwnProfile ? (
            <>
              <Image height="200px" src={FollowAProjectUrl} />
              <Body medium>{t('You do not follow any project')}</Body>
              <Body medium>
                {t('Check out some trending projects this week that you can follow in the discovery view!')}
              </Body>
              <Button size="lg" colorScheme="primary1" as={Link} to={getPath('discoveryLanding')}>
                {t('Discover projects')}
              </Button>
            </>
          ) : (
            <Body medium>{t('User does not follow any project')}</Body>
          )}
        </VStack>
      )}
    </VStack>
  )
}
