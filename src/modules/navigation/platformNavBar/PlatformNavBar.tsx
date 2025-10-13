import { Button, HStack, IconButton, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { PiArrowLeft, PiCopy, PiShareFat, PiX } from 'react-icons/pi'
import { Location, useLocation, useNavigate } from 'react-router'

import { currentRouteAtom } from '@/config/routes/index.ts'
import { EmailPromptModal } from '@/modules/auth/components/EmailPromptModal'
import { NotificationPromptModal } from '@/modules/auth/components/NotificationPromptModal'
import { useEmailPromptModal } from '@/modules/auth/hooks/useEmailPromptModal'
import { useNotificationPromptModal } from '@/modules/auth/hooks/useNotificationPromptModal'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'

import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../modules/auth/hooks'
import { PathName } from '../../../shared/constants'
import { BrandLogo, BrandLogoFull } from './components/BrandLogo'
import { LoggedOutModal } from './components/LoggedOutModal'
import { LoginButton } from './components/LoginButton'
import { ProjectLogo } from './components/ProjectLogo'
import { ProjectSelectMenu } from './components/ProjectSelectMenu'
import {
  isDiscoveryRoutesAtom,
  shouldShowGeyserLogoAtom,
  shouldShowProjectLogoAtom,
  useIsManifestoPage,
} from './platformNavBarAtom'
import { PlatformNav } from './profileNav/components/PlatformNav.tsx'
import { ProfileNav } from './profileNav/ProfileNav'

export const PlatformNavBar = () => {
  const { isLoggedIn, logout, queryCurrentUser, user } = useAuthContext()
  const { loginIsOpen, loginOnClose, loginModalAdditionalProps } = useAuthModal()

  const { onCopy, hasCopied } = useCopyToClipboard(
    `${window.location.origin}/${PathName.guardians}${user.heroId ? `?hero=${user.heroId}` : ''}`,
  )

  const isManifestoPage = useIsManifestoPage()

  const shouldShowProjectLogo = useAtomValue(shouldShowProjectLogoAtom)
  const shouldShowGeyserLogo = useAtomValue(shouldShowGeyserLogoAtom)
  const isPlatformRoutes = useAtomValue(isDiscoveryRoutesAtom)

  const currentROute = useAtomValue(currentRouteAtom)
  console.log('currentROute', currentROute)

  const { emailPromptIsOpen, emailPromptOnOpen, emailPromptOnClose } = useEmailPromptModal()

  const { notificationPromptIsOpen, dontAskNotificationAgain, notificationPromptOnClose } = useNotificationPromptModal()

  const navigate = useNavigate()

  const location: Location & {
    state: {
      loggedOut?: boolean
      refresh?: boolean
    }
  } = useLocation()
  const isGuardiansPage = location.pathname.includes('/guardians')

  const { state } = location

  const {
    isOpen: isLoginAlertModalOpen,
    onOpen: onLoginAlertModalOpen,
    onClose: onLoginAlertModalClose,
  } = useDisclosure()

  console.log('isPlatformRoutes', isPlatformRoutes)

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
    if (isPlatformRoutes) {
      return <BrandLogoFull />
    }

    if (shouldShowProjectLogo) {
      return <ProjectLogo />
    }

    if (shouldShowGeyserLogo) {
      return <BrandLogo showOutline={isGuardiansPage} />
    }

    return <BrandLogo showOutline={isGuardiansPage} />
  }, [shouldShowGeyserLogo, shouldShowProjectLogo, isPlatformRoutes, isGuardiansPage])

  const ShareGuardiansButton = () => {
    return (
      <Button
        variant={hasCopied ? 'solid' : 'outline'}
        colorScheme={hasCopied ? 'primary1' : 'neutral1'}
        size={{ base: 'md', lg: 'lg' }}
        rightIcon={hasCopied ? <PiCopy /> : <PiShareFat />}
        onClick={() => onCopy()}
        backgroundColor={hasCopied ? undefined : 'utils.pbg'}
      >
        {hasCopied ? t('Copied') : t('Share')}
      </Button>
    )
  }

  const CloseGoBackButton = () => {
    return (
      <IconButton
        variant="outline"
        colorScheme="neutral1"
        size={{ base: 'md', lg: 'lg' }}
        width={{ base: '40px', lg: '48px' }}
        minWidth={{ base: '40px', lg: '48px' }}
        height={{ base: '40px', lg: '48px' }}
        borderRadius="50% !important"
        aria-label="go-back"
        icon={<PiX fontSize={'24px'} />}
        onClick={() => navigate(-1)}
      />
    )
  }

  const BackButton = () => {
    return (
      <IconButton
        variant="outline"
        colorScheme="neutral1"
        size={{ base: 'md', lg: 'lg' }}
        width={{ base: '32px', lg: '40px' }}
        minWidth={{ base: '32px', lg: '40px' }}
        height={{ base: '32px', lg: '40px' }}
        paddingInlineStart={'4px !important'}
        paddingInlineEnd={'4px !important'}
        borderRadius="50% !important"
        backgroundColor="utils.pbg"
        aria-label="go-back"
        icon={<PiArrowLeft fontSize={'16px'} />}
        onClick={() => navigate(-1)}
      />
    )
  }

  return (
    <HStack
      w="full"
      position="fixed"
      top={0}
      justifyContent={'center'}
      zIndex={99}
      bgColor={isGuardiansPage ? 'transparent' : 'utils.pbg'}
    >
      <VStack
        paddingY={{ base: 5, lg: 8 }}
        paddingX={{ base: 3, lg: 6 }}
        maxWidth={dimensions.guardians.maxWidth}
        width="100%"
        backgroundColor={isGuardiansPage ? 'transparent' : 'utils.pbg'}
        justifySelf={'center'}
        spacing={4}
      >
        <HStack
          w="100%"
          height={{ base: '40px', lg: '48px' }}
          justifyContent={'space-between'}
          spacing={{ base: 2, lg: 4 }}
        >
          <HStack height="full">
            {isGuardiansPage && <BackButton />}
            {renderLeftSide()}
          </HStack>

          {isPlatformRoutes && <PlatformNav />}

          {isManifestoPage ? (
            <CloseGoBackButton />
          ) : (
            <HStack position="relative" spacing={2}>
              {!isLoggedIn ? (
                <>
                  <LoginButton />
                </>
              ) : isGuardiansPage ? (
                <ShareGuardiansButton />
              ) : (
                <ProjectSelectMenu />
              )}
              <ProfileNav />
            </HStack>
          )}
        </HStack>
      </VStack>

      <LoggedOutModal isOpen={isLoginAlertModalOpen} onClose={onLoginAlertModalClose} />

      <AuthModal
        isOpen={loginIsOpen}
        onClose={() => {
          loginOnClose()
          onLoginAlertModalClose()
          emailPromptOnOpen()
        }}
        {...loginModalAdditionalProps}
      />
      <EmailPromptModal isOpen={emailPromptIsOpen} onClose={emailPromptOnClose} />
      {!dontAskNotificationAgain && (
        <NotificationPromptModal isOpen={notificationPromptIsOpen} onClose={notificationPromptOnClose} />
      )}
    </HStack>
  )
}
