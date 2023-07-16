import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout, StickToTop } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { useAuthContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { MobileTopBar } from '../filters/mobile/MobileTopBar'
import { ActivityFeed } from './ActivityFeed'
import { LoggedOut } from './views'

export const LandingFeed = () => {
  const { t } = useTranslation()
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
          bias={10}
          buffer={10}
        >
          <MobileTopBar title={t('Activity')} subTitle={t('Filter')} />
        </StickToTop>
      )}

      <CardLayout noborder={isMobileMode} w="full" paddingX="0px">
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
      borderColor="neutral.200"
      paddingY="6px"
      marginBottom="10px"
    >
      <Body1 semiBold color="neutral.1000">
        Activity
      </Body1>
    </HStack>
  )
}
