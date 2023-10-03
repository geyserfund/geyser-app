import { Box } from '@chakra-ui/layout'
import { Fade } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import PullToRefresh from 'react-simple-pull-to-refresh'

import { LandingNavBar, TopNavBar } from './components/nav'
import { ProfileSideNavigation } from './components/nav/profileRightSideNav'
import { PullingDownContent } from './components/ui'
import { dimensions, ID } from './constants'
import { useAuthContext } from './context'
import { LoadingPage } from './pages/loading'
import { useMobileMode } from './utils'

export const AppLayout = () => {
  const { loading } = useAuthContext()
  const isMobile = useMobileMode()

  if (loading) {
    return <LoadingPage />
  }

  const handleFunction = async () => {
    window.location.reload()
  }

  return (
    <PullToRefresh
      onRefresh={handleFunction}
      pullingContent={<PullingDownContent />}
      pullDownThreshold={dimensions.pullDownThreshold}
    >
      <Fade in={true}>
        <Box
          minHeight="100vh"
          height={isMobile ? '100%' : '100vh'}
          display="flex"
          flexDir="column"
        >
          <TopNavBar />

          <ProfileSideNavigation>
            <Box
              id={ID.root}
              maxHeight="100%"
              flex="1"
              paddingTop={`${dimensions.topNavBar.desktop.height}px`}
              backgroundColor={{ base: 'neutral.0', lg: 'neutral.50' }}
              overflowY={isMobile ? 'initial' : 'auto'}
            >
              <Outlet />
            </Box>
            {isMobile && <LandingNavBar />}
          </ProfileSideNavigation>
        </Box>
      </Fade>
    </PullToRefresh>
  )
}
