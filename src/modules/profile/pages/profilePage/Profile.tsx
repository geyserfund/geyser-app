import { GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { MobileDivider } from '../../../../pages/grants/components'
import { toInt } from '../../../../utils'
import { ProfileError } from '../../components/ProfileError'
import { useUserProfile } from '../../hooks/useUserProfile'
import { AccountInfo } from './views/account/AccountInfo'
import { Badges } from './views/badges'
import { ProfileTabs } from './views/profileTabs'
import { Summary } from './views/summary/Summary'

export const Profile = () => {
  const params = useParams<{ userId: string }>()
  const userId = useMemo(() => {
    return toInt(params.userId)
  }, [params])

  const { isLoading, error } = useUserProfile(userId)

  if (error) {
    return <ProfileError />
  }

  return (
    <VStack
      position="relative"
      width="100%"
      height="100%"
      backgroundColor="neutral.0"
      paddingY={{ base: '20px', lg: '40px' }}
      paddingX={{ base: '0px', lg: '20px', xl: '40px' }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 11 }}
        spacingX={{ lg: '30px', xl: '40px' }}
        spacingY="20px"
        width="100%"
        height="100%"
        maxWidth="1590px"
      >
        <GridItem colSpan={{ base: 1, lg: 3 }} order={1}>
          <AccountInfo isLoading={isLoading} />
          <MobileDivider mt={4} />
        </GridItem>
        <GridItem
          h="100%"
          overflow={{ base: 'visible', lg: 'hidden' }}
          colSpan={{ base: 1, lg: 5 }}
          order={{ base: 3, lg: 2 }}
          paddingBottom="10px"
        >
          <ProfileTabs isLoading={isLoading} />
        </GridItem>
        <GridItem
          h="100%"
          overflow={{ base: 'visible', lg: 'auto' }}
          colSpan={{ base: 1, lg: 3 }}
          order={{ base: 2, lg: 3 }}
        >
          <VStack spacing={{ base: 0, lg: '10px' }}>
            <Summary />
            <MobileDivider mb="10px" />
            <Badges isLoading={isLoading} />
          </VStack>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default Profile
