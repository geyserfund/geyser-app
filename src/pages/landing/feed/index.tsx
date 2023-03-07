import { HStack } from '@chakra-ui/react'

import { CardLayout, StickToTop } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { useAuthContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { ActivityFeed } from './ActivityFeed'
import { LoggedOut } from './views/LoggedOut'

export const LandingFeed = () => {
  const { isLoggedIn, loading } = useAuthContext()
  const isMobileMode = useMobileMode()
  if (loading) {
    return null
  }

  if (!isLoggedIn) {
    return <LoggedOut />
  }

  return (
    <>
      {isMobileMode && (
        <StickToTop
          id="landing-page-mobile-projects-activity-list"
          width="100%"
          _onStick={{ width: 'calc(100% - 20px)' }}
        >
          <ActivityTopbar />
        </StickToTop>
      )}
      {}

      <CardLayout w="full" paddingX="0px">
        <ActivityFeed />
      </CardLayout>
    </>
  )
}

export const ActivityTopbar = () => {
  return (
    <HStack
      width="100%"
      borderBottom="2px solid"
      borderColor="brand.neutral200"
      paddingY="6px"
      marginBottom="10px"
    >
      <Body1 semiBold color="black">
        Activity
      </Body1>
    </HStack>
  )
}
