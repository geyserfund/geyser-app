import { Box, HStack, IconButton, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { PiX } from 'react-icons/pi'
import { Location, useLocation, useNavigate } from 'react-router'

import { EmailPromptModal } from '@/modules/auth/components/EmailPromptModal'
import { NotificationPromptModal } from '@/modules/auth/components/NotificationPromptModal'
import { useEmailPromptModal } from '@/modules/auth/hooks/useEmailPromptModal'
import { useNotificationPromptModal } from '@/modules/auth/hooks/useNotificationPromptModal'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ID } from '@/shared/constants/components/id.ts'
import { getPath } from '@/shared/constants/index.ts'
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
  const creatorNavScrollThreshold = 20
  const { isLoggedIn, isUserAProjectCreator, logout, queryCurrentUser } = useAuthContext()
  const { loginIsOpen, loginOnClose, loginModalAdditionalProps } = useAuthModal()
  const defaultNavShadow = useColorModeValue('0 2px 12px rgba(15, 23, 42, 0.08)', '0 2px 14px rgba(0, 0, 0, 0.28)')
  const landingButtonSurface = useColorModeValue('white', 'neutral1.3')
  const landingButtonForeground = useColorModeValue('black', 'white')
  const landingButtonBorder = useColorModeValue('black', 'neutral1.6')
  const landingButtonHover = useColorModeValue('gray.50', 'neutral1.2')
  const landingButtonActive = useColorModeValue('gray.100', 'neutral1.2')
  const transparentButtonSurface = useColorModeValue('whiteAlpha.220', 'whiteAlpha.220')
  const transparentButtonForeground = useColorModeValue('white', 'white')
  const transparentButtonBorder = useColorModeValue('whiteAlpha.500', 'whiteAlpha.500')
  const transparentButtonHover = useColorModeValue('whiteAlpha.320', 'whiteAlpha.320')
  const transparentButtonActive = useColorModeValue('whiteAlpha.420', 'whiteAlpha.420')
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
  const [creatorNavScrolled, setCreatorNavScrolled] = useState(false)

  const {
    isOpen: isLoginAlertModalOpen,
    onOpen: onLoginAlertModalOpen,
    onClose: onLoginAlertModalClose,
  } = useDisclosure()

  const creatorRoute = getPath('discoveryCreator')
  const isCreatorPage = location.pathname === creatorRoute || location.pathname.startsWith(`${creatorRoute}/`)

  useEffect(() => {
    if (!isCreatorPage) {
      setCreatorNavScrolled(false)
      return
    }

    const rootElement = document.getElementById(ID.root)

    const getScrollTop = () => {
      if (rootElement) {
        return rootElement.scrollTop
      }

      return window.scrollY || document.scrollingElement?.scrollTop || 0
    }

    const handleScroll = () => {
      setCreatorNavScrolled(getScrollTop() > creatorNavScrollThreshold)
    }

    handleScroll()

    rootElement?.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll)

    return () => {
      rootElement?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [creatorNavScrollThreshold, isCreatorPage])

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

    return <BrandLogoFull forceLightLogo={isCreatorPage && !creatorNavScrolled} />
  }, [creatorNavScrolled, isCreatorPage, isProjectFundingRoutes])

  const shouldShowPlatformNav =
    (isPlatformRoutes || isProjectRoutes || isGuardiansPage || isProfilePage || isAmbassadorProgramPage) &&
    !isProjectFundingRoutes &&
    !isProjectDashboardRoutes &&
    !isMobileMode
  const isCreatorTransparentNav = isCreatorPage && !creatorNavScrolled
  const navShadow = isCreatorTransparentNav || isProjectRoutes || isProfilePage ? 'none' : defaultNavShadow
  const navBackgroundColor = isCreatorTransparentNav ? 'transparent' : 'utils.pbg'

  const renderRightSide = useCallback(() => {
    if (isManifestoPage) {
      return <CloseGoBackButton />
    }

    const shouldShowLandingCreateButton = shouldShowPlatformNav && (!isLoggedIn || !isUserAProjectCreator)
    const shouldShowProjectSelectMenu = isLoggedIn && (!shouldShowPlatformNav || isUserAProjectCreator)

    const actionButtonSurface = isCreatorTransparentNav ? transparentButtonSurface : landingButtonSurface
    const actionButtonForeground = isCreatorTransparentNav ? transparentButtonForeground : landingButtonForeground
    const actionButtonBorder = isCreatorTransparentNav ? transparentButtonBorder : landingButtonBorder
    const actionButtonHover = isCreatorTransparentNav ? transparentButtonHover : landingButtonHover
    const actionButtonActive = isCreatorTransparentNav ? transparentButtonActive : landingButtonActive

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
          bg={actionButtonSurface}
          color={actionButtonForeground}
          borderColor={actionButtonBorder}
          borderWidth="1px"
          _hover={{ bg: actionButtonHover }}
          _active={{ bg: actionButtonActive }}
          borderRadius="8px"
        />
        <CreateProjectButton
          display={{ base: 'none', xl: 'flex' }}
          label={t('Start your project')}
          noIcon
          size={{ base: 'md', lg: 'lg' }}
          minWidth="190px"
          variant="outline"
          bg={actionButtonSurface}
          color={actionButtonForeground}
          borderColor={actionButtonBorder}
          borderWidth="1px"
          _hover={{ bg: actionButtonHover }}
          _active={{ bg: actionButtonActive }}
          borderRadius={{ base: '8px', lg: '10px' }}
        />
      </>
    ) : null

    return (
      <HStack position="relative">
        {!isLoggedIn ? (
          <>
            {landingCreateButton}
            <LoginButton
              color={isCreatorTransparentNav ? 'white' : undefined}
              _hover={isCreatorTransparentNav ? { backgroundColor: 'whiteAlpha.220' } : undefined}
              _active={isCreatorTransparentNav ? { backgroundColor: 'whiteAlpha.320' } : undefined}
            />
            {!shouldShowPlatformNav && (
              <CreateProjectButton display={{ base: 'none', lg: 'flex' }} label={t('Creator')} noIcon />
            )}
          </>
        ) : (
          <>
            {landingCreateButton}
            {shouldShowProjectSelectMenu ? <ProjectSelectMenu transparentMode={isCreatorTransparentNav} /> : null}
          </>
        )}
        <ProfileNav />
      </HStack>
    )
  }, [
    isLoggedIn,
    isCreatorTransparentNav,
    isManifestoPage,
    isUserAProjectCreator,
    landingButtonActive,
    landingButtonBorder,
    landingButtonForeground,
    landingButtonHover,
    landingButtonSurface,
    shouldShowPlatformNav,
    transparentButtonActive,
    transparentButtonBorder,
    transparentButtonForeground,
    transparentButtonHover,
    transparentButtonSurface,
  ])

  return (
    <HStack
      w="full"
      position="fixed"
      top={0}
      justifyContent={'center'}
      zIndex={99}
      bgColor={navBackgroundColor}
      boxShadow={navShadow}
      transition="background-color 0.25s ease, box-shadow 0.25s ease"
    >
      <VStack
        paddingTop={{ base: 3, lg: 5 }}
        paddingBottom={{ base: 3, lg: 5 }}
        paddingX={{ base: 3, lg: 6, xl: 12 }}
        maxWidth={dimensions.guardians.maxWidth}
        width="100%"
        backgroundColor={navBackgroundColor}
        justifySelf={'center'}
        spacing={4}
        transition="background-color 0.25s ease"
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
                  <LandingDesktopNav transparentMode={isCreatorTransparentNav} />
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
