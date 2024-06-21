import { Box } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import PullToRefresh from 'react-simple-pull-to-refresh'

import { PullingDownContent } from './components/ui'
import { useSetHistoryRoute } from './config'
import { dimensions, ID } from './constants'
import { useAuthContext } from './context'
import { useLayoutAnimation } from './hooks'
import { TopNavBar } from './modules/navigation/topNavBar/TopNavBar'
import { LandingNavBar } from './navigation/bottomNav/LandingNavBar'
import { LoadingPage } from './pages/loading'
import { useMobileMode } from './utils'

export const AppLayout = () => {
  const { loading } = useAuthContext()

  const isMobile = useMobileMode()

  const location = useLocation()
  const setHistoryRoute = useSetHistoryRoute()
  useEffect(() => {
    setHistoryRoute(location.pathname)
  }, [location.pathname, setHistoryRoute])

  const layoutAnimationClassName = useLayoutAnimation()

  const handleFunction = async () => {
    window.location.reload()
  }

  return (
    <>
      {loading && <LoadingPage />}
      <PullToRefresh
        onRefresh={handleFunction}
        pullingContent={<PullingDownContent />}
        pullDownThreshold={dimensions.pullDownThreshold}
        isPullable={isMobile}
      >
        <Box w="full" h={'100%'} position="relative" className={layoutAnimationClassName}>
          <Box
            w="full"
            minHeight="100vh"
            height={{ base: '100%', lg: '100vh' }}
            display="flex"
            alignItems="center"
            flexDir="column"
            backgroundColor="utils.pbg"
            overflowY={'auto'}
          >
            <TopNavBar />
            <Box
              id={ID.root}
              maxHeight="100%"
              width="100%"
              flex="1"
              paddingTop={`${dimensions.topNavBar.desktop.height}px`}
              overflowY={{ base: 'initial', lg: 'auto' }}
            >
              <Outlet />
            </Box>
            {isMobile && <LandingNavBar />}
          </Box>
        </Box>
      </PullToRefresh>
    </>
  )
}
