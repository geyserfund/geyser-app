import { Box } from '@chakra-ui/layout'
import { Fade } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import PullToRefresh from 'react-simple-pull-to-refresh'

import { PullingDownContent } from './components/ui'
import { dimensions, ID } from './constants'
import { useAuthContext } from './context'
import { useLayoutAnimation } from './hooks'
import { LandingNavBar } from './navigation/bottomNav/LandingNavBar'
import { ProfileSideNavigation } from './navigation/profileRightSideNav'
import { TopNavBar } from './navigation/topNavBar/TopNavBar'
import { LoadingPage } from './pages/loading'
import { useMobileMode } from './utils'

export const AppLayout = () => {
  const { loading } = useAuthContext()
  const isMobile = useMobileMode()

  const layoutAnimationClassName = useLayoutAnimation()

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
      isPullable={isMobile}
    >
      <Fade in={true}>
        <Box
          w="full"
          h={'100%'}
          position="relative"
          className={layoutAnimationClassName}
        >
          <Box
            minHeight="100vh"
            height={isMobile ? '100%' : '100vh'}
            display="flex"
            flexDir="column"
          >
            <TopNavBar />
            <ProfileSideNavigation />
            <Box
              id={ID.root}
              maxHeight="100%"
              flex="1"
              paddingTop={`${dimensions.topNavBar.desktop.height}px`}
              backgroundColor="neutral.0"
              overflowY={isMobile ? 'initial' : 'auto'}
            >
              <Outlet />
            </Box>
            {isMobile && <LandingNavBar />}
          </Box>
        </Box>
      </Fade>
    </PullToRefresh>
  )
}
