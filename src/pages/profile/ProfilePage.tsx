import { useLazyQuery } from '@apollo/client'
import {
  Box,
  Center,
  Container,
  HStack,
  Skeleton,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import { AppFooter } from '../../components/molecules'
import { AlertBox } from '../../components/ui'
import { useAuthContext } from '../../context'
import { defaultUser } from '../../defaults'
import { QUERY_USER_PROFILE } from '../../graphql'
import { User, UserGetInput } from '../../types/generated/graphql'
import { toInt, useDarkMode } from '../../utils'
import { UserProfilePageHeader, UserProfilePageTabs } from './components'

type ResponseData = {
  user: User
}

type QueryVariables = {
  where: UserGetInput
}

export const ProfilePage = () => {
  const isInDarkMode = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()

  const { user: currentAppUser } = useAuthContext()
  const params = useParams<{ userId: string }>()

  const [
    queryCurrentUser,
    { loading: profileLoading, error, data: userProfileData },
  ] = useLazyQuery<ResponseData, QueryVariables>(QUERY_USER_PROFILE)

  const isViewingOwnProfile = () =>
    location.pathname === `/profile/${currentAppUser.id}`

  const [userProfile, setUserProfile] = useState<User>({ ...defaultUser })

  const handleLaunchIdea = () => {
    navigate('/launch')
  }

  /*
	useEffect functions
	*/
  useEffect(() => {
    if (params.userId) {
      const variables: QueryVariables = {
        where: {
          id: toInt(params.userId),
        },
      }
      queryCurrentUser({ variables })
    }
  }, [params])

  useEffect(() => {
    if (userProfileData && userProfileData.user) {
      const user = userProfileData.user as User

      setUserProfile({
        ...userProfile,
        ...user,
      })
    }
  }, [userProfileData])

  useEffect(() => {
    if (isViewingOwnProfile()) {
      setUserProfile({
        ...userProfile,
        ...currentAppUser,
      })
    }
  }, [currentAppUser])

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
    <Box
      position="relative"
      width="full"
      height="full"
      backgroundColor={isInDarkMode ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
    >
      <Container
        width="full"
        maxWidth={'1080px'}
        height="auto"
        minHeight={'full'}
        paddingY={{
          base: '24px',
          lg: '100px',
          xl: '124px',
        }}
      >
        {userProfile.id === 0 || profileLoading ? (
          <ProjectSkeleton />
        ) : (
          <VStack
            flexDirection={'column'}
            justifyContent="flex-start"
            spacing={'64px'}
          >
            <UserProfilePageHeader
              profileUser={userProfile}
              onProjectCreateSelected={handleLaunchIdea}
            />

            <Box width="100%">
              <UserProfilePageTabs profileUser={userProfile} />
            </Box>
          </VStack>
        )}
      </Container>

      <AppFooter />
    </Box>
  )
}

const ProjectSkeleton = () => {
  return (
    <>
      <VStack width="100%" spacing="20px">
        <HStack width="100%" justifyContent="space-between">
          <HStack spacing="30px">
            <Skeleton height="50px" width="50px" borderRadius="50%" />
            <Skeleton height="30px" width="200px" />
          </HStack>
        </HStack>

        <HStack width="100%">
          <Skeleton height="30px" width="100px" />
        </HStack>
      </VStack>
      <VStack spacing="20px">
        <HStack width="100%">
          <Skeleton height="44px" width="120px" />
          <Skeleton height="44px" width="120px" />
        </HStack>
        <HStack>
          <Skeleton height="300px" width="300px" borderRadius="4px" />
          <Skeleton height="300px" width="300px" borderRadius="4px" />
          <Skeleton height="300px" width="300px" borderRadius="4px" />
        </HStack>
      </VStack>
    </>
  )
}
