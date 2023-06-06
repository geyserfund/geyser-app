import { Box } from '@chakra-ui/layout'
import { Fade } from '@chakra-ui/react'

import { LandingNavBar, TopNavBar } from './components/nav'
import { Router } from './config'
import { dimensions } from './constants'
import { ID } from './constants/components'
import { useAuthContext } from './context'
import { LoadingPage } from './pages/loading'
import { useMobileMode } from './utils'

export const AppLayout = () => {
  const { loading } = useAuthContext()
  const isMobile = useMobileMode()

  if (loading) {
    return <LoadingPage />
  }

  return (
    <Fade in={true}>
      <Box height={isMobile ? '100%' : '100vh'} display="flex" flexDir="column">
        <TopNavBar />

        <Box
          id={ID.root}
          maxHeight="100%"
          flex="1"
          paddingTop={`${dimensions.topNavBar.desktop.height}px`}
          backgroundColor="neutral.50"
          overflowY={isMobile ? 'initial' : 'auto'}
        >
          <Router />
        </Box>
        {isMobile && <LandingNavBar />}
      </Box>
    </Fade>
  )
}
