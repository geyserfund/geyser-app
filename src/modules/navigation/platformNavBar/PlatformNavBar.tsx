import { Box, Button, HStack, IconButton, useBreakpointValue, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { PiX } from 'react-icons/pi'
import { Link, Location, useLocation, useNavigate } from 'react-router'

import { EmailPromptModal } from '@/modules/auth/components/EmailPromptModal'
import { NotificationPromptModal } from '@/modules/auth/components/NotificationPromptModal'
import { useEmailPromptModal } from '@/modules/auth/hooks/useEmailPromptModal'
import { useNotificationPromptModal } from '@/modules/auth/hooks/useNotificationPromptModal'
import { LandingSearchInput } from '@/modules/discovery/pages/landing/components/LandingSearchInput.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ID } from '@/shared/constants/components/id.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { standardPadding } from '@/shared/styles/index.ts'
import { useMobileMode } from '@/utils/index.ts'

import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../modules/auth/hooks'
import { BrandLogo, BrandLogoFull } from './components/BrandLogo'
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
  const landingContentMaxWidth = `${dimensions.maxWidth + 24 * 2}px`

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
  const launchStartRoute = getPath('launchStart')
  const isCreatorPage = location.pathname === creatorRoute || location.pathname.startsWith(`${creatorRoute}/`)
  const isLaunchStartPage = location.pathname === launchStartRoute

  useEffect(() => {
    if (!isCreatorPage) {
      setCreatorNavScrolled(false)
      return
    }

    const rootElement = document.getElementById(ID.root)

    const getScrollTop = () => {
      if (!isMobileMode && rootElement) {
        return rootElement.scrollTop
      }

      return window.scrollY || window.pageYOffset || document.scrollingElement?.scrollTop || 0
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
  }, [creatorNavScrollThreshold, isCreatorPage, isMobileMode])

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

    if (isMobileMode) {
      return <BrandLogo />
    }

    return <BrandLogoFull forceLightLogo={isCreatorPage && !creatorNavScrolled} />
  }, [creatorNavScrolled, isCreatorPage, isMobileMode, isProjectFundingRoutes])

  const shouldShowPlatformNav =
    (isPlatformRoutes ||
      isProjectRoutes ||
      isGuardiansPage ||
      isProfilePage ||
      isAmbassadorProgramPage ||
      isLaunchStartPage) &&
    !isProjectFundingRoutes &&
    !isProjectDashboardRoutes
  const shouldShowDesktopNav = Boolean(shouldShowPlatformNav && !isMobileMode)
  const shouldShowMobileSearch = Boolean(shouldShowPlatformNav && isMobileMode)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const shouldUseWideNavLayout = Boolean(useBreakpointValue({ base: false, '2xl': true }, { ssr: false }))
  const isCreatorTransparentNav = isCreatorPage && !creatorNavScrolled
  const navBackgroundColor = isCreatorTransparentNav ? 'transparent' : 'utils.pbg'

  const renderRightSide = useCallback(() => {
    if (isManifestoPage) {
      return <CloseGoBackButton />
    }

    const shouldShowProjectSelectMenu = isLoggedIn && (!shouldShowDesktopNav || isUserAProjectCreator)

    const becomeFieldPartnerButton = shouldShowDesktopNav ? (
      <Button
        as="a"
        href={ImpactFundsFieldPartnerApplicationUrl}
        target="_blank"
        rel="noreferrer"
        display={{ base: 'none', xl: 'flex' }}
        size={{ base: 'md', lg: 'lg' }}
        variant="ghost"
        color="black"
        fontWeight={600}
        borderRadius={{ base: '8px', lg: '10px' }}
        _hover={isCreatorTransparentNav ? { backgroundColor: 'whiteAlpha.200' } : undefined}
        _active={isCreatorTransparentNav ? { backgroundColor: 'whiteAlpha.300' } : undefined}
      >
        {t('Become a Field Partner')}
      </Button>
    ) : null

    const supportGeyserButton = shouldShowDesktopNav ? (
      <Button
        as={Link}
        to={getPath('fundingStart', 'geyser')}
        display={{ base: 'none', lg: 'flex' }}
        size={{ base: 'md', lg: 'lg' }}
        variant="outline"
        colorScheme="neutral1"
        bg="white"
        color="black"
        borderColor="neutral1.6"
        fontWeight={600}
        borderRadius={{ base: '8px', lg: '10px' }}
        _hover={{ bg: 'neutral1.2', borderColor: 'neutral1.7' }}
      >
        {t('Support Geyser')}
      </Button>
    ) : null

    return (
      <HStack position="relative" spacing={{ base: 1, lg: 2 }}>
        {shouldShowDesktopNav && !shouldUseWideNavLayout ? (
          <Box
            width={isSearchExpanded ? '240px' : '48px'}
            minWidth={isSearchExpanded ? '240px' : '48px'}
            transition="width 0.2s ease, min-width 0.2s ease"
          >
            <LandingSearchInput
              compact={!isSearchExpanded}
              size="lg"
              width="full"
              autoFocus={isSearchExpanded}
              transparentMode={isCreatorTransparentNav}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => setIsSearchExpanded(false)}
            />
          </Box>
        ) : null}
        {!isLoggedIn ? (
          <>
            {becomeFieldPartnerButton}
            {supportGeyserButton}
            <LoginButton
              color="black"
              paddingX={{ base: 2, lg: 4 }}
              _hover={isCreatorTransparentNav ? { backgroundColor: 'whiteAlpha.220' } : undefined}
              _active={isCreatorTransparentNav ? { backgroundColor: 'whiteAlpha.320' } : undefined}
            />
          </>
        ) : (
          <>
            {becomeFieldPartnerButton}
            {supportGeyserButton}
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
    isSearchExpanded,
    isUserAProjectCreator,
    shouldShowDesktopNav,
    shouldUseWideNavLayout,
  ])

  return (
    <HStack
      w="full"
      position="fixed"
      top={0}
      justifyContent={'center'}
      zIndex={99}
      bgColor={navBackgroundColor}
      boxShadow="none"
      transition="background-color 0.25s ease"
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
            zIndex={5}
            pointerEvents="none"
          >
            <HStack height="full" flexShrink={0} pointerEvents="auto" spacing={{ base: 1, lg: 2 }}>
              {renderLeftSide()}
              {shouldShowDesktopNav && !shouldUseWideNavLayout ? (
                <LandingDesktopNav transparentMode={isCreatorTransparentNav} />
              ) : null}
            </HStack>
            {shouldShowMobileSearch ? (
              <Box flex={1} minWidth={0} px={1} pointerEvents="auto">
                <LandingSearchInput size="md" width="full" transparentMode={isCreatorTransparentNav} />
              </Box>
            ) : null}
            <Box flexShrink={0} pointerEvents="auto">
              {renderRightSide()}
            </Box>
          </HStack>
        </VStack>
      </VStack>

      {shouldShowDesktopNav && shouldUseWideNavLayout ? (
        <>
          <HStack
            position="absolute"
            inset={0}
            justifyContent="center"
            alignItems="center"
            pointerEvents="none"
            zIndex={4}
          >
            <HStack
              w="100%"
              maxWidth={landingContentMaxWidth}
              paddingX={standardPadding}
              height={{ base: '40px', lg: '48px' }}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box pointerEvents="auto">
                <LandingDesktopNav transparentMode={isCreatorTransparentNav} />
              </Box>
            </HStack>
          </HStack>
          <HStack
            position="absolute"
            inset={0}
            justifyContent="center"
            alignItems="center"
            pointerEvents="none"
            zIndex={4}
          >
            <Box pointerEvents="auto" width={{ lg: '280px', xl: '360px' }}>
              <LandingSearchInput size="lg" width="full" transparentMode={isCreatorTransparentNav} />
            </Box>
          </HStack>
        </>
      ) : null}

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
