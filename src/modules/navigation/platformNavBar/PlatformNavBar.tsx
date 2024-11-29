import { Button, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { PiCopy, PiShareFat } from 'react-icons/pi'
import { Location, useLocation, useNavigate } from 'react-router-dom'

import { FilterComponent } from '@/modules/discovery/filters/FilterComponent'
import { HeroCardModal } from '@/modules/profile/pages/profilePage/views/account/views/HeroCardModal'
import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'
import { EmailPromptModal } from '@/pages/auth/components/EmailPromptModal'
import { NotificationPromptModal } from '@/pages/auth/components/NotificationPromptModal'
import { useEmailPromptModal } from '@/pages/auth/hooks/useEmailPromptModal'
import { useNotificationPromptModal } from '@/pages/auth/hooks/useNotificationPromptModal'
import { discoveryPageCommonLayoutStyles } from '@/shared/styles/discoveryPageLayout'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { useMobileMode } from '@/utils'

import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../pages/auth/hooks'
import { dimensions, PathName } from '../../../shared/constants'
import { BrandLogo, BrandLogoFull } from './components/BrandLogo'
import { LoggedOutModal } from './components/LoggedOutModal'
import { LoginButton } from './components/LoginButton'
import { ProjectLogo } from './components/ProjectLogo'
import { ProjectSelectMenu } from './components/ProjectSelectMenu'
import {
  isDiscoveryRoutesAtom,
  shouldShowGeyserLogoAtom,
  shouldShowProjectLogoAtom,
  useIsGuardiansPage,
} from './platformNavBarAtom'
import { ProfileNav } from './profileNav/ProfileNav'

export const PlatformNavBar = () => {
  const { isLoggedIn, logout, queryCurrentUser } = useAuthContext()
  const { loginIsOpen, loginOnClose, loginModalAdditionalProps } = useAuthModal()

  const { onCopy, hasCopied } = useCopyToClipboard(`${window.location.origin}/${PathName.guardians}`)

  const heroCard = useAtomValue(heroCardAtom)

  const isGuardiansPage = useIsGuardiansPage()

  const isMobileMode = useMobileMode()

  const shouldShowProjectLogo = useAtomValue(shouldShowProjectLogoAtom)
  const shouldShowGeyserLogo = useAtomValue(shouldShowGeyserLogoAtom)
  const isPlatformRoutes = useAtomValue(isDiscoveryRoutesAtom)

  const { emailPromptIsOpen, emailPromptOnOpen, emailPromptOnClose } = useEmailPromptModal()

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
    if (isPlatformRoutes) {
      if (isMobileMode) {
        return <BrandLogoFull />
      }

      return <FilterComponent />
    }

    if (shouldShowProjectLogo) {
      return <ProjectLogo />
    }

    if (shouldShowGeyserLogo) {
      return <BrandLogo />
    }

    return <BrandLogo />
  }, [shouldShowGeyserLogo, shouldShowProjectLogo, isPlatformRoutes, isMobileMode])

  const ShareGuardiansButton = () => {
    return (
      <Button
        variant={hasCopied ? 'solid' : 'outline'}
        colorScheme={hasCopied ? 'primary1' : 'neutral1'}
        size={{ base: 'md', lg: 'lg' }}
        rightIcon={hasCopied ? <PiCopy /> : <PiShareFat />}
        onClick={() => onCopy()}
      >
        {hasCopied ? t('Copied') : t('Share')}
      </Button>
    )
  }

  return (
    <HStack
      w="full"
      position="fixed"
      top={0}
      {...(isPlatformRoutes && discoveryPageCommonLayoutStyles)}
      justifyContent={'center'}
      zIndex={9}
      bgColor={isGuardiansPage ? (isMobileMode ? 'guardians.background' : 'transparent') : 'utils.pbg'}
    >
      <VStack
        paddingY={{ base: 5, lg: 8 }}
        paddingX={{ base: 3, lg: 6 }}
        maxWidth={
          isGuardiansPage
            ? dimensions.guardians.maxWidth
            : { base: dimensions.maxWidth + 24, lg: dimensions.maxWidth + 48 }
        }
        width="100%"
        backgroundColor={isGuardiansPage ? 'transparent' : 'utils.pbg'}
        justifySelf={'center'}
        spacing={4}
      >
        <HStack w="100%" height={{ base: '40px', lg: '48px' }} justifyContent={'space-between'}>
          {renderLeftSide()}

          <HStack position="relative">
            {!isLoggedIn ? <LoginButton /> : isGuardiansPage ? <ShareGuardiansButton /> : <ProjectSelectMenu />}
            <ProfileNav />
          </HStack>
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
      {heroCard?.isOpen && <HeroCardModal />}
    </HStack>
  )
}
