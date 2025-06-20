import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import PullToRefresh from 'react-simple-pull-to-refresh'

import { PullingDownContent } from './components/ui'
import { useHistoryRoutes } from './config/routes/hooks/useHistoryRoutes'
import { useMatchRoutes } from './config/routes/hooks/useMatchRoutes'
import { useAuthContext } from './context'
import { useActivityHook } from './modules/discovery/hooks/useActivityHook'
import { PlatformNavBar } from './modules/navigation/platformNavBar/PlatformNavBar'
import { InfoBanner } from './modules/notification/InfoBanner'
import { NoticeBanner } from './modules/notification/NoticeBanner'
import { LoadingPage } from './modules/general/loading/index.tsx'
import { dimensions, ID } from './shared/constants'
import { useLayoutAnimation } from './shared/hooks'
import { useCountriesData } from './shared/hooks/graphqlState/useCountriesData.ts'
import { useInitBtcRate } from './shared/hooks/platform/useInitBtcRate'
import { useInitiateSpeedWalletParams } from './shared/hooks/useInitiateSpeedWalletParams.tsx'
import { useMobileMode } from './utils'
import { useScrollToTop } from './utils/tools/useScrollToTop'

export const AppLayout = () => {
  useInitBtcRate()
  useInitiateSpeedWalletParams()
  useCountriesData()

  const { loading } = useAuthContext()

  const isMobile = useMobileMode()

  useMatchRoutes()
  useHistoryRoutes()
  useActivityHook()
  useScrollToTop()

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
        maxPullDownDistance={dimensions.pullDownThreshold}
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
          >
            <PlatformNavBar />
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
            <InfoBanner />
            <NoticeBanner />
          </Box>
        </Box>
      </PullToRefresh>
    </>
  )
}
