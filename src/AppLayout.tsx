import { Box } from '@chakra-ui/layout'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import PullToRefresh from 'react-simple-pull-to-refresh'

import { PullingDownContent } from './components/ui'
import { useHistoryRoutes } from './config/routes/hooks/useHistoryRoutes'
import { useMatchRoutes } from './config/routes/hooks/useMatchRoutes'
import { useAuthContext } from './context'
import { TopNavBar } from './modules/navigation/topNavBar/TopNavBar'
import { LandingNavBar } from './navigation/bottomNav/LandingNavBar'
import { LoadingPage } from './pages/loading'
import { dimensions, ID } from './shared/constants'
import { useLayoutAnimation } from './shared/hooks'
import { useInitBtcRate } from './shared/hooks/platform/useInitBtcRate'
import { useMobileMode } from './utils'

const AppLayout = () => {
  useInitBtcRate()

  const { loading } = useAuthContext()

  const isMobile = useMobileMode()

  useMatchRoutes()
  useHistoryRoutes()

  const layoutAnimationClassName = useLayoutAnimation()

  const handleFunction = async () => {
    window.location.reload()
  }

  return (
    <>
      <ScrollRestoration />
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
              paddingTop={{
                base: `${dimensions.topNavBar.mobile.height}px`,
                lg: `${dimensions.topNavBar.desktop.height}px`,
              }}
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

export default AppLayout
