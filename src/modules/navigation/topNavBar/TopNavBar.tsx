import { Button, HStack, Image, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Location, useLocation, useNavigate } from 'react-router-dom'

import LogoDark from '../../../assets/logo-dark.svg'
import LogoLight from '../../../assets/logo-light.svg'
import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { useAuthModal } from '../../../pages/auth/hooks'
import { LoggedOutModal } from './LoggedOutModal'
import { UserNav } from './UserNav'

export const TopNavBar = () => {
  const imagesrc = useColorModeValue(LogoDark, LogoLight)
  const { user, isLoggedIn, logout, queryCurrentUser } = useAuthContext()
  const { loginOnOpen, loginIsOpen, loginOnClose } = useAuthModal()
  const { t } = useTranslation()
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
      <HStack paddingY={{ base: 4, lg: 8 }} maxWidth="960px" width="100%" backgroundColor={'utils.pbg'}>
        <HStack w="100%" height={'48px'} justifyContent={'space-between'}>
          <Image src={imagesrc} height="100%" width="auto" objectFit="contain" />
          {isLoggedIn ? (
            <UserNav user={user} />
          ) : (
            <Button variant="soft" colorScheme="primary1" onClick={loginOnOpen}>
              {t('Login')}
            </Button>
          )}
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
