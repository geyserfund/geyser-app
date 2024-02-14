import { Center, Container, GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { AlertBox } from '../../components/ui'
import { useAuthContext } from '../../context'
import { defaultUser } from '../../defaults'
import { useUserProfileQuery } from '../../types'
import { toInt } from '../../utils'
import { MobileDivider } from '../grants/components'
import { UserProfile } from './type'
import { AccountInfo, Badges, Summary } from './views'
import { ProfileTabs } from './views/profileTabs'

export const Profile = () => {
  const { t } = useTranslation()

  const { user: currentAppUser } = useAuthContext()
  const params = useParams<{ userId: string }>()
  const id = useMemo(() => {
    return toInt(params.userId)
  }, [params])

  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUser as UserProfile)

  const isViewingOwnProfile = useMemo(
    () => currentAppUser && params.userId === currentAppUser.id,
    [params.userId, currentAppUser],
  )

  const { loading: profileLoading, error } = useUserProfileQuery({
    variables: {
      where: {
        id,
      },
    },
    skip: !id,
    onCompleted(data) {
      if (data.user) {
        if (isViewingOwnProfile) {
          setUserProfile({
            ...data.user,
            ...currentAppUser,
          })
        } else {
          setUserProfile(data.user)
        }
      }
    },
  })

  useEffect(() => {
    if (isViewingOwnProfile) {
      setUserProfile((current) => ({
        ...current,
        ...currentAppUser,
      }))
    }
  }, [isViewingOwnProfile, currentAppUser])

  if (error) {
    return (
      <Container position="relative" height="100%" display={'flex'} justifyContent="center" alignItems="center">
        <Center>
          <AlertBox
            height="200px"
            status="error"
            title={t('An error occurred while attempting to load the profile page.')}
            message={t('Please try refreshing the page. You may also want to contact support if the problem persists.')}
          />
        </Center>
      </Container>
    )
  }

  if (!userProfile) {
    return null
  }

  return (
    <VStack
      position="relative"
      width="100%"
      height="100%"
      backgroundColor="neutral.0"
      paddingY={{ base: '20px', lg: '40px' }}
      paddingX={{ base: '0px', lg: '40px' }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 7 }}
        spacingX={{ lg: '30px', xl: '40px' }}
        spacingY="20px"
        width="100%"
        height="100%"
        maxWidth="1590px"
      >
        <GridItem colSpan={{ base: 1, lg: 2 }} order={1}>
          <AccountInfo
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            isEdit={isViewingOwnProfile}
            isLoading={profileLoading}
          />
          <MobileDivider mt={4} />
        </GridItem>
        <GridItem
          h="100%"
          overflow={{ base: 'visible', lg: 'hidden' }}
          colSpan={{ base: 1, lg: 3 }}
          order={{ base: 3, lg: 2 }}
        >
          <ProfileTabs userProfile={userProfile} isLoading={profileLoading} isViewingOwnProfile={isViewingOwnProfile} />
        </GridItem>
        <GridItem
          h="100%"
          overflow={{ base: 'visible', lg: 'auto' }}
          colSpan={{ base: 1, lg: 2 }}
          order={{ base: 2, lg: 3 }}
        >
          <VStack spacing="10px">
            <Summary userProfile={userProfile} />
            <Badges userProfile={userProfile} isEdit={isViewingOwnProfile} isLoading={profileLoading} />
          </VStack>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default Profile
