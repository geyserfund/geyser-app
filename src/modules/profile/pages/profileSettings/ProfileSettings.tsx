import { Box, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'

import { CardLayout } from '../../../../shared/components/layouts'
import { toInt, useMobileMode } from '../../../../utils'
import { ProfileError } from '../../components/ProfileError'
import { useUserProfile } from '../../hooks/useUserProfile'
import { ProfileSettingsMenuDesktop } from './navigation/ProfileSettingsMenu'

export const ProfileSettings = () => {
  const params = useParams<{ userId: string }>()
  const userId = useMemo(() => {
    return toInt(params.userId)
  }, [params])

  const { error } = useUserProfile(userId)

  const isMobile = useMobileMode()

  if (error) {
    return <ProfileError />
  }

  return (
    <VStack
      width="100%"
      height="100%"
      paddingTop={{
        base: `${dimensions.projectNavBar.mobile.height}px`,
        lg: `${dimensions.projectNavBar.desktop.height}px`,
      }}
      paddingX={standardPadding}
      // TODO: adapt paddingBottom
      paddingBottom={10}
      alignItems="center"
    >
      <Box w="100%" height="100%" maxWidth={dimensions.maxWidth}>
        <CardLayout dense noborder={isMobile} w="full" direction="row" spacing={0} height="100%">
          {!isMobile && <ProfileSettingsMenuDesktop />}
          <Outlet />
        </CardLayout>
      </Box>
    </VStack>
  )
}

export default ProfileSettings
