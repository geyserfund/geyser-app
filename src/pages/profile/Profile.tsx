import { useLazyQuery } from '@apollo/client'
import {
  Center,
  Container,
  GridItem,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'

import { AlertBox } from '../../components/ui'
import { useAuthContext } from '../../context'
import { defaultUser } from '../../defaults'
import { USER_PROFILE_QUERY } from '../../graphql'
import { User, UserGetInput } from '../../types/generated/graphql'
import { toInt } from '../../utils'
import { AccountInfo, Badges, CreateProject } from './views'

type ResponseData = {
  user: User
}

type QueryVariables = {
  where: UserGetInput
}

export const Profile = () => {
  const location = useLocation()
  const { user: currentAppUser } = useAuthContext()
  const params = useParams<{ userId: string }>()

  const [userProfile, setUserProfile] = useState<User>({ ...defaultUser })

  const [queryCurrentUser, { loading: profileLoading, error }] = useLazyQuery<
    ResponseData,
    QueryVariables
  >(USER_PROFILE_QUERY, {
    onCompleted(data) {
      if (data && data.user) {
        const user = data.user as User
        if (isViewingOwnProfile) {
          setUserProfile({
            ...currentAppUser,
            ...user,
          })
        } else {
          setUserProfile({
            ...user,
          })
        }
      }
    },
  })

  const isViewingOwnProfile =
    location.pathname === `/profile/${currentAppUser.id}`

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
    if (isViewingOwnProfile) {
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
    <VStack
      position="relative"
      width="full"
      height="full"
      backgroundColor={'brand.bgGrey4'}
      paddingTop={{ base: '20px', lg: '80px' }}
      paddingX={{ base: '10px', lg: '40px' }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 7 }}
        spacingX={{ lg: '40px', xl: '80px' }}
        spacingY="20px"
        width="100%"
        height="full"
        maxWidth="1590px"
      >
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <AccountInfo
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            isEdit={isViewingOwnProfile}
            isLoading={profileLoading}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <Badges
            userProfile={userProfile}
            isEdit={isViewingOwnProfile}
            isLoading={profileLoading}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          {isViewingOwnProfile && <CreateProject />}
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}
