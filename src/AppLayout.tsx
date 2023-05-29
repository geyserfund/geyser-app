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
    <Fade
      in={true}
      style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
    >
      <Box height="100vh" display="flex" flexDirection="column" flexGrow={1}>
        <TopNavBar />

        <Box
          id={ID.root}
          minHeight="100%"
          flex="1"
          paddingTop={`${dimensions.topNavBar.desktop.height}px`}
          overflowY="auto"
        >
          <Router />
        </Box>
        {isMobile && <LandingNavBar />}
      </Box>
    </Fade>
  )
}
