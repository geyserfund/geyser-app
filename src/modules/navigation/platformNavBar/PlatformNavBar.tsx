import { Box, HStack, IconButton, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { PiX } from 'react-icons/pi'
import { Location, useLocation, useNavigate } from 'react-router'

import { EmailPromptModal } from '@/modules/auth/components/EmailPromptModal'
import { NotificationPromptModal } from '@/modules/auth/components/NotificationPromptModal'
import { useEmailPromptModal } from '@/modules/auth/hooks/useEmailPromptModal'
import { useNotificationPromptModal } from '@/modules/auth/hooks/useNotificationPromptModal'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'
import { useMobileMode } from '@/utils/index.ts'

import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../modules/auth/hooks'
import { BrandLogoFull } from './components/BrandLogo'
import { CreateProjectButton } from './components/CreateProjectButton.tsx'
import { LandingDesktopNav } from './components/LandingDesktopNav.tsx'
import { LoggedOutModal } from './components/LoggedOutModal'
import { LoginButton } from './components/LoginButton'
import { ProjectLogo } from './components/ProjectLogo'
import { ProjectSelectMenu } from './components/ProjectSelectMenu'
import {
  isDiscoveryRoutesAtom,
  isProjectDashboardRoutesAtom,
  isProjectFundingRoutesAtom,
  isProjectRoutesAtom,
  useIsAmbassadorProgramPage,
  useIsGuardiansPage,
  useIsManifestoPage,
  useIsProfilePage,
} from './platformNavBarAtom'
import { ProfileNav } from './profileNav/ProfileNav'

/** Renders the fixed top platform navigation shared across platform pages. */
export const PlatformNavBar = () => {
  const { isLoggedIn, isUserAProjectCreator, logout, queryCurrentUser } = useAuthContext()
  const { loginIsOpen, loginOnClose, loginModalAdditionalProps } = useAuthModal()
  const defaultNavShadow = useColorModeValue('0 2px 12px rgba(15, 23, 42, 0.08)', '0 2px 14px rgba(0, 0, 0, 0.28)')
  const landingButtonSurface = useColorModeValue('white', 'neutral1.3')
  const landingButtonForeground = useColorModeValue('black', 'white')
  const landingButtonBorder = useColorModeValue('black', 'neutral1.6')
  const landingButtonHover = useColorModeValue('gray.50', 'neutral1.2')
  const landingButtonActive = useColorModeValue('gray.100', 'neutral1.2')
  const landingNavMaxWidth = `${dimensions.maxWidth + 24 * 2}px`

  const isMobileMode = useMobileMode()

  const isGuardiansPage = useIsGuardiansPage()
  const isManifestoPage = useIsManifestoPage()
  const isProfilePage = useIsProfilePage()
  const isAmbassadorProgramPage = useIsAmbassadorProgramPage()

  const isPlatformRoutes = useAtomValue(isDiscoveryRoutesAtom)
  const isProjectRoutes = useAtomValue(isProjectRoutesAtom)
  const isProjectDashboardRoutes = useAtomValue(isProjectDashboardRoutesAtom)
  const isProjectFundingRoutes = useAtomValue(isProjectFundingRoutesAtom)

  const { emailPromptIsOpen, emailPromptOnOpen, emailPromptOnClose, emailPromptVariant } = useEmailPromptModal()

  const { notificationPromptIsOpen, dontAskNotificationAgain, notificationPromptOnClose } = useNotificationPromptModal()

  const navigate = useNavigate()

  const location: Location & {
    state: {
      loggedOut?: boolean
      refresh?: boolean
    }
  } = useLocation()
  const { state } = location

  const {
    isOpen: isLoginAlertModalOpen,
    onOpen: onLoginAlertModalOpen,
    onClose: onLoginAlertModalClose,
  } = useDisclosure()

  useEffect(() => {
    if (state && state.loggedOut) {
      logout()
      onLoginAlertModalOpen()

      navigate(location.pathname, { state: {} })
    }

    if (state && state.refresh) {
      queryCurrentUser()
      navigate(location.pathname, { state: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const renderLeftSide = useCallback(() => {
    if (isProjectFundingRoutes) {
      return <ProjectLogo />
    }

    return <BrandLogoFull />
  }, [isProjectFundingRoutes])

  const shouldShowPlatformNav =
    (isPlatformRoutes || isProjectRoutes || isGuardiansPage || isProfilePage || isAmbassadorProgramPage) &&
    !isProjectFundingRoutes &&
    !isProjectDashboardRoutes &&
    !isMobileMode
  const navShadow = isProjectRoutes || isProfilePage ? 'none' : defaultNavShadow

  const renderRightSide = useCallback(() => {
    if (isManifestoPage) {
      return <CloseGoBackButton />
    }

    const shouldShowLandingCreateButton = shouldShowPlatformNav && (!isLoggedIn || !isUserAProjectCreator)
    const shouldShowProjectSelectMenu = isLoggedIn && (!shouldShowPlatformNav || isUserAProjectCreator)

    const landingCreateButton = shouldShowLandingCreateButton ? (
      <>
        <CreateProjectButton
          display={{ base: 'none', lg: 'flex', xl: 'none' }}
          iconOnly
          aria-label={t('Start your project')}
          size="md"
          width="40px"
          minWidth="40px"
          paddingX={0}
          variant="outline"
          bg={landingButtonSurface}
          color={landingButtonForeground}
          borderColor={landingButtonBorder}
          borderWidth="1px"
          _hover={{ bg: landingButtonHover }}
          _active={{ bg: landingButtonActive }}
          borderRadius="8px"
        />
        <CreateProjectButton
          display={{ base: 'none', xl: 'flex' }}
          label={t('Start your project')}
          noIcon
          size={{ base: 'md', lg: 'lg' }}
          minWidth="190px"
          variant="outline"
          bg={landingButtonSurface}
          color={landingButtonForeground}
          borderColor={landingButtonBorder}
          borderWidth="1px"
          _hover={{ bg: landingButtonHover }}
          _active={{ bg: landingButtonActive }}
          borderRadius={{ base: '8px', lg: '10px' }}
        />
      </>
    ) : null

    return (
      <HStack position="relative">
        {!isLoggedIn ? (
          <>
            {landingCreateButton}
            <LoginButton />
            {!shouldShowPlatformNav && (
              <CreateProjectButton display={{ base: 'none', lg: 'flex' }} label={t('Creator')} noIcon />
            )}
          </>
        ) : (
          <>
            {landingCreateButton}
            {shouldShowProjectSelectMenu ? <ProjectSelectMenu /> : null}
          </>
        )}
        <ProfileNav />
      </HStack>
    )
  }, [
    isLoggedIn,
    isManifestoPage,
    isUserAProjectCreator,
    landingButtonActive,
    landingButtonBorder,
    landingButtonForeground,
    landingButtonHover,
    landingButtonSurface,
    shouldShowPlatformNav,
  ])

  return (
    <HStack
      w="full"
      position="fixed"
      top={0}
      justifyContent={'center'}
      zIndex={99}
      bgColor="utils.pbg"
      boxShadow={navShadow}
    >
      <VStack
        paddingTop={{ base: 3, lg: 5 }}
        paddingBottom={{ base: 3, lg: 5 }}
        paddingX={{ base: 3, lg: 6, xl: 12 }}
        maxWidth={dimensions.guardians.maxWidth}
        width="100%"
        backgroundColor="utils.pbg"
        justifySelf={'center'}
        spacing={4}
      >
        <VStack w="100%" spacing={0} position="relative">
          <HStack
            w="100%"
            height={{ base: '40px', lg: '48px' }}
            justifyContent={'space-between'}
            spacing={{ base: 2, lg: 4 }}
            position="relative"
            zIndex={3}
            pointerEvents="none"
          >
            <HStack height="full" flexShrink={0} pointerEvents="auto">
              {renderLeftSide()}
            </HStack>
            <Box pointerEvents="auto">{renderRightSide()}</Box>
          </HStack>

          {shouldShowPlatformNav ? (
            <HStack
              position="absolute"
              inset={0}
              justifyContent="center"
              alignItems="center"
              pointerEvents="none"
              zIndex={2}
            >
              <HStack
                w="100%"
                maxWidth={landingNavMaxWidth}
                paddingX={standardPadding}
                height={{ base: '40px', lg: '48px' }}
                pointerEvents="none"
                justifyContent="center"
              >
                <Box pointerEvents="auto">
                  <LandingDesktopNav />
                </Box>
              </HStack>
            </HStack>
          ) : null}
        </VStack>
      </VStack>

      <LoggedOutModal isOpen={isLoginAlertModalOpen} onClose={onLoginAlertModalClose} />

      <AuthModal
        isOpen={loginIsOpen}
        onClose={() => {
          loginOnClose()
          onLoginAlertModalClose()
          emailPromptOnOpen('mandatory_after_login')
        }}
        {...loginModalAdditionalProps}
      />
      <EmailPromptModal isOpen={emailPromptIsOpen} onClose={emailPromptOnClose} variant={emailPromptVariant} />
      {!dontAskNotificationAgain && (
        <NotificationPromptModal isOpen={notificationPromptIsOpen} onClose={notificationPromptOnClose} />
      )}
    </HStack>
  )
}

const CloseGoBackButton = () => {
  const navigate = useNavigate()

  return (
    <IconButton
      variant="outline"
      colorScheme="neutral1"
      size={{ base: 'md', lg: 'lg' }}
      width={{ base: '40px', lg: '48px' }}
      minWidth={{ base: '40px', lg: '48px' }}
      height={{ base: '40px', lg: '48px' }}
      borderRadius="50% !important"
      aria-label={t('Go back')}
      icon={<PiX fontSize={'24px'} />}
      onClick={() => navigate(-1)}
    />
  )
}
