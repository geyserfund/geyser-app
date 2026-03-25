import { HStack, IconButton, useDisclosure, VStack } from '@chakra-ui/react'
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
import { useMobileMode } from '@/utils/index.ts'

import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../modules/auth/hooks'
import { BrandLogo } from './components/BrandLogo'
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
  useIsGuardiansPage,
  useIsManifestoPage,
  useIsProfilePage,
} from './platformNavBarAtom'
import { ProfileNav } from './profileNav/ProfileNav'

/** Renders the fixed top platform navigation shared across platform pages. */
export const PlatformNavBar = () => {
  const { isLoggedIn, logout, queryCurrentUser } = useAuthContext()
  const { loginIsOpen, loginOnClose, loginModalAdditionalProps } = useAuthModal()

  const isMobileMode = useMobileMode()

  const isGuardiansPage = useIsGuardiansPage()
  const isManifestoPage = useIsManifestoPage()
  const isProfilePage = useIsProfilePage()

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

    return <BrandLogo />
  }, [isProjectFundingRoutes])

  const shouldShowPlatformNav =
    (isPlatformRoutes || isProjectRoutes || isGuardiansPage || isProfilePage) &&
    !isProjectFundingRoutes &&
    !isProjectDashboardRoutes &&
    !isMobileMode

  const renderRightSide = useCallback(() => {
    if (isManifestoPage) {
      return <CloseGoBackButton />
    }

    const landingCreateButton = shouldShowPlatformNav ? (
      <CreateProjectButton
        display={{ base: 'none', lg: 'flex' }}
        label={t('Start your project')}
        noIcon
        size={{ base: 'md', lg: 'lg' }}
        minWidth="190px"
        variant="solid"
        colorScheme="primary1"
        borderRadius={{ base: '8px', lg: '10px' }}
      />
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
            <ProjectSelectMenu />
          </>
        )}
        <ProfileNav />
      </HStack>
    )
  }, [isLoggedIn, isManifestoPage, shouldShowPlatformNav])

  return (
    <HStack
      w="full"
      position="fixed"
      top={0}
      justifyContent={'center'}
      zIndex={99}
      bgColor="utils.pbg"
    >
      <VStack
        paddingY={{ base: 5, lg: 8 }}
        paddingX={{ base: 3, lg: 6, xl: 12 }}
        maxWidth={dimensions.guardians.maxWidth}
        width="100%"
        backgroundColor="utils.pbg"
        justifySelf={'center'}
        spacing={4}
      >
        <HStack
          w="100%"
          height={{ base: '40px', lg: '48px' }}
          justifyContent={'space-between'}
          spacing={{ base: 2, lg: 4 }}
        >
          <HStack height="full">{renderLeftSide()}</HStack>

          {shouldShowPlatformNav ? <LandingDesktopNav /> : null}

          {renderRightSide()}
        </HStack>
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
