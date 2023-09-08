import { Box } from '@chakra-ui/layout'
import { Fade } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'
import PullToRefresh from 'react-simple-pull-to-refresh'

import { LandingNavBar, TopNavBar } from './components/nav'
import { PullingDownContent } from './components/ui'
import { Router } from './config'
import { dimensions, ID } from './constants'
import { useAuthContext } from './context'
import { LoadingPage } from './pages/loading'
import { useMobileMode } from './utils'

const useStyles = createUseStyles({
  pullToRefresh: {
    '&.ptr--dragging, &.ptr--pull-down-treshold-breached': {
      height: '100vh',
    },
  },
})

export const AppLayout = () => {
  const { loading } = useAuthContext()
  const isMobile = useMobileMode()
  const classes = useStyles()

  if (loading) {
    return <LoadingPage />
  }

  const handleFunction = async () => {
    window.location.reload()
  }

  return (
    <PullToRefresh
      onRefresh={handleFunction}
      className={classes.pullToRefresh}
      pullingContent={<PullingDownContent />}
      pullDownThreshold={dimensions.pullDownThreshold}
    >
      <Fade in={true}>
        <Box
          height={isMobile ? '100%' : '100vh'}
          display="flex"
          flexDir="column"
        >
          <TopNavBar />

          <Box
            id={ID.root}
            maxHeight="100%"
            flex="1"
            paddingTop={`${dimensions.topNavBar.desktop.height}px`}
            backgroundColor={{ base: 'neutral.0', lg: 'neutral.50' }}
            overflowY={isMobile ? 'initial' : 'auto'}
          >
            <Router />
          </Box>
          {isMobile && <LandingNavBar />}
        </Box>
      </Fade>
    </PullToRefresh>
  )
}
