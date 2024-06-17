import { HStack, Image, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'

import LogoDark from '../../../assets/logo-dark.svg'
import LogoLight from '../../../assets/logo-light.svg'
import { AuthModal } from '../../../components/molecules'
import { dimensions } from '../../../constants'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../pages/auth/hooks'
import { LoginButton } from '../components/LoginButton'
import { ProfileNav } from '../profileNav/ProfileNav'
import { LoggedOutModal } from './components/LoggedOutModal'

export const TopNavBar = () => {
  const imagesrc = useColorModeValue(LogoDark, LogoLight)
  const { isLoggedIn, logout, queryCurrentUser } = useAuthContext()
  const { loginIsOpen, loginOnClose } = useAuthModal()

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
      >
        <HStack w="100%" height={'48px'} justifyContent={'space-between'}>
          <Image src={imagesrc} height="100%" width="auto" objectFit="contain" />
          <HStack position="relative">
            {!isLoggedIn && <LoginButton />}
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
        }}
      />
    </>
  )
}
