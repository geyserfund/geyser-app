import { Button, HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PropsWithChildren } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { H1 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { currentProfileSettingsItemAtom, isProfileSettingsMainRouteAtom } from '../navigation/profileSettingsAtom'

type ProfileSettingsLayoutProps = {
  mobileTopNavRightComponent?: React.ReactNode
  deskTopBottomComponent?: React.ReactNode
  desktopTitle?: string
} & StackProps

/** All Profile Settings main Pages must be wrapped by this Layout container */
export const ProfileSettingsLayout = ({
  children,
  mobileTopNavRightComponent,
  deskTopBottomComponent,
  desktopTitle,
  ...props
}: PropsWithChildren<ProfileSettingsLayoutProps>) => {
  const { user } = useAuthContext()

  const isMobileMode = useMobileMode()

  const currentProfileSettingsItem = useAtomValue(currentProfileSettingsItemAtom)
  const isProfileSettingsMainRoute = useAtomValue(isProfileSettingsMainRouteAtom)

  const showTopNavBar = isMobileMode && !isProfileSettingsMainRoute

  if (!currentProfileSettingsItem && !isProfileSettingsMainRoute) {
    return null
  }

  return (
    <VStack
      height="100%"
      width={{ base: '100%', lg: `calc(100% - ${dimensions.profile.settings.menu.width + 24 * 2 + 1}px)` }}
      position="relative"
      {...props}
    >
      {showTopNavBar && (
        <ProjectNavContainer>
          <Button
            as={Link}
            to={getPath('userProfileSettings', user?.id)}
            size={{ base: 'md', lg: 'lg' }}
            variant="ghost"
            colorScheme="neutral1"
            leftIcon={<PiArrowLeft />}
            _pressed={{}}
          >
            {t('Profile Settings')}
          </Button>
        </ProjectNavContainer>
      )}
      <VStack
        w="full"
        height="100%"
        overflowY="auto"
        spacing={4}
        paddingTop={{ base: 3, lg: 6 }}
        paddingBottom={{ base: 3, lg: deskTopBottomComponent ? 28 : 28 }}
        alignItems={'start'}
      >
        {currentProfileSettingsItem && (
          <HStack w="full" h="32px" justifyContent={'start'} spacing={2} display={{ base: 'flex', lg: 'none' }}>
            <H1 size="2xl" dark bold>
              {t(currentProfileSettingsItem.label)}
            </H1>
          </HStack>
        )}
        {desktopTitle && (
          <H1 size="2xl" medium paddingX={6} display={{ base: 'none', lg: 'block' }}>
            {desktopTitle}
          </H1>
        )}
        {children}
      </VStack>
    </VStack>
  )
}
