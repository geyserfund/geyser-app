import { Box, Icon, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { PiArrowLeft, PiX } from 'react-icons/pi'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'

import { Body1 } from '../../components/typography'
import { ButtonComponent } from '../../components/ui'
import { useMobileMode } from '../../utils'

// Cookies provider wraps only this component where it is used. Will need to be moved higher up in the tree if required elsewhere.
export const FailedAuth = () => {
  return (
    <CookiesProvider>
      <FailedAuthComponent />
    </CookiesProvider>
  )
}

export const FailedAuthComponent = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { logout } = useAuthContext()

  const [cookie, _, removeCookie] = useCookies()

  useEffect(() => {
    if (cookie.accessToken) {
      removeCookie('accessToken')
    }

    if (cookie.refreshToken) {
      removeCookie('refreshToken')
    }
  }, [cookie, removeCookie])

  useEffect(() => {
    logout()
  }, [logout])

  return (
    <VStack
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      spacing="20px"
      paddingBottom="30%"
      paddingX="20px"
    >
      <Text fontWeight="bold" fontSize={isMobile ? '2xl' : '3xl'} textAlign="center">
        {t('Error')}
      </Text>
      <Box
        bg="secondary.red"
        borderRadius="full"
        width="75px"
        height="75px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={PiX} w={7} h={7} />
      </Box>
      <Body1>{t('Authentication failed.')}</Body1>
      <Body1>{t("Please clear your browser's cache & cookies and try again.")}</Body1>
      <Body1>
        {t(
          'You can do this by opening your Development environment (Right click -> inspect), then clicking on Application > Storage > Clear site data.',
        )}
      </Body1>

      <ButtonComponent as={Link} to={'/'} width="full" maxWidth="200px" leftIcon={<PiArrowLeft fontSize="25px" />}>
        {t('Go back')}
      </ButtonComponent>
    </VStack>
  )
}
