import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, Outlet, useParams } from 'react-router-dom'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { dimensions, getPath } from '@/shared/constants'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { useMobileMode } from '../../../../utils'
import { ProfileError } from '../../components/ProfileError'
import { useUserProfile } from '../../hooks/useUserProfile'
import { ProfileSettingsMenuDesktop } from './navigation/ProfileSettingsMenu'

export const ProfileSettings = () => {
  const params = useParams<{ userId: string }>()
  const userId = useMemo(() => {
    return params.userId
  }, [params])

  const { error } = useUserProfile({ userId })

  const isMobile = useMobileMode()

  if (error || !userId) {
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
      paddingBottom={10}
      alignItems="center"
    >
      <TopNavContainerBar>
        <Button
          as={Link}
          to={getPath('userProfile', userId)}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('Back to profile')}
        </Button>
      </TopNavContainerBar>
      <CardLayout dense noborder={isMobile} w="full" direction="row" spacing={0} height="100%">
        {!isMobile && <ProfileSettingsMenuDesktop />}
        <Outlet />
      </CardLayout>
    </VStack>
  )
}

export default ProfileSettings
