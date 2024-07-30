import { HStack, useDisclosure } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'

import { EmailPromptModal } from '@/pages/auth/components/EmailPromptModal'
import { useEmailPromptModal } from '@/pages/auth/hooks/useEmailPromptModal'

import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../pages/auth/hooks'
import { dimensions } from '../../../shared/constants'
import { LoginButton } from '../components/LoginButton'
import { ProfileNav } from '../profileNav/ProfileNav'
import { BrandLogo } from './components/BrandLogo'
import { LoggedOutModal } from './components/LoggedOutModal'
import { ProjectLogo } from './components/ProjectLogo'
import { ProjectSelectMenu } from './components/ProjectSelectMenu'
import { shouldShowProjectLogoAtom } from './topNavBarAtom'

export const TopNavBar = () => {
  const { isLoggedIn, logout, queryCurrentUser } = useAuthContext()
  const { loginIsOpen, loginOnClose } = useAuthModal()

  const shouldShowProjectLogo = useAtomValue(shouldShowProjectLogoAtom)

  const { emailPromptIsOpen, emailPromptOnOpen, emailPromptOnClose } = useEmailPromptModal()

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

  return (
    <>
      <HStack
        paddingY={{ base: 4, lg: 8 }}
        paddingX={{ base: 3, lg: 5 }}
        maxWidth={{ base: dimensions.maxWidth + 24, lg: dimensions.maxWidth + 40 }}
        width="100%"
        backgroundColor={'utils.pbg'}
        position="fixed"
        top={0}
        zIndex={9}
      >
        <HStack w="100%" height={{ base: '40px', lg: '48px' }} justifyContent={'space-between'}>
          {shouldShowProjectLogo ? <ProjectLogo /> : <BrandLogo />}

          <HStack position="relative">
            {!isLoggedIn ? <LoginButton /> : <ProjectSelectMenu />}
            <ProfileNav />
          </HStack>
        </HStack>
      </HStack>

      <LoggedOutModal isOpen={isLoginAlertModalOpen} onClose={onLoginAlertModalClose} />

      <AuthModal
        isOpen={loginIsOpen}
        onClose={() => {
          loginOnClose()
          onLoginAlertModalClose()
          emailPromptOnOpen()
        }}
      />
      <EmailPromptModal isOpen={emailPromptIsOpen} onClose={emailPromptOnClose} />
    </>
  )
}
