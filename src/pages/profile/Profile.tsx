import { useQuery } from '@apollo/client'
import {
  Center,
  Container,
  GridItem,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { AlertBox } from '../../components/ui'
import { useAuthContext } from '../../context'
import { defaultUser } from '../../defaults'
import { USER_PROFILE_QUERY } from '../../graphql'
import { User, UserGetInput } from '../../types/generated/graphql'
import { toInt } from '../../utils'
import { AccountInfo, Badges, CreateProject } from './views'
import { ProfileTabs } from './views/profileTabs'

type ResponseData = {
  user: User
}

type QueryVariables = {
  where: UserGetInput
}

export const Profile = () => {
  const { user: currentAppUser } = useAuthContext()
  const params = useParams<{ userId: string }>()

  const [userProfile, setUserProfile] = useState<User>({ ...defaultUser })

  const {
    loading: profileLoading,
    error,
    data,
  } = useQuery<ResponseData, QueryVariables>(USER_PROFILE_QUERY, {
    variables: {
      where: {
        id: toInt(params.userId),
      },
    },
    skip: !params.userId,
  })

  const isViewingOwnProfile = useMemo(
    () => params.userId === currentAppUser.id,
    [params.userId, currentAppUser.id],
  )

  useEffect(() => {
    if (data && data.user) {
      const user = data.user as User
      if (isViewingOwnProfile) {
        setUserProfile({
          ...currentAppUser,
          ...user,
        })
      } else {
        setUserProfile(user)
      }
    }
  }, [currentAppUser, data, isViewingOwnProfile])

  if (error) {
    return (
      <Container
        position="relative"
        height="100%"
        display={'flex'}
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <AlertBox
            height="200px"
            status="error"
            title="An error occurred while attempting to load the profile page."
            message="Please try refreshing the page. You may also want to contact support if the problem persists."
          />
        </Center>
      </Container>
    )
  }

  return (
    <VStack
      position="relative"
      width="100%"
      height="100%"
      backgroundColor={'brand.bgGrey4'}
      paddingY={{ base: '20px', lg: '40px' }}
      paddingX={{ base: '10px', lg: '40px' }}
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
          {isViewingOwnProfile && <CreateProject marginTop="20px" />}
        </GridItem>
        <GridItem
          h="100%"
          overflow="hidden"
          colSpan={{ base: 1, lg: 3 }}
          order={{ base: 3, md: 2 }}
        >
          <ProfileTabs userProfile={userProfile} isLoading={profileLoading} />
        </GridItem>
        <GridItem
          h="100%"
          overflow="hidden"
          colSpan={{ base: 1, lg: 2 }}
          order={{ base: 2, md: 3 }}
        >
          <Badges
            userProfile={userProfile}
            isEdit={isViewingOwnProfile}
            isLoading={profileLoading}
          />
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}
