import { CloseIcon } from '@chakra-ui/icons'
import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

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
  const isMobile = useMobileMode()

  const [cookie, _, removeCookie] = useCookies()

  useEffect(() => {
    if (cookie.accessToken) {
      removeCookie('accessToken')
    }

    if (cookie.refreshToken) {
      removeCookie('refreshToken')
    }
  }, [cookie])
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
      <Text
        fontWeight="bold"
        fontSize={isMobile ? '2xl' : '3xl'}
        textAlign="center"
      >
        Error
      </Text>
      <Box
        bg="brand.error"
        borderRadius="full"
        width="75px"
        height="75px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CloseIcon w={7} h={7} />
      </Box>
      <Body1>Authentication failed.</Body1>
      <Body1>
        {"Please clear your browser's cache & cookies and try again."}
      </Body1>

      <ButtonComponent
        as={Link}
        to={'/'}
        width="full"
        maxWidth="200px"
        leftIcon={<BsArrowLeft fontSize="25px" />}
      >
        Go back
      </ButtonComponent>
    </VStack>
  )
}
