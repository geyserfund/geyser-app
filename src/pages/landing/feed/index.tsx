import { HStack } from '@chakra-ui/react'

import { CardLayout, StickToTop } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { dimensions } from '../../../constants'
import { useMobileMode } from '../../../utils'
import { Contributions } from './Contributions'

export const LandingFeed = () => {
  const isMobileMode = useMobileMode()
  return (
    <>
      {isMobileMode && (
        <StickToTop
          id="landing-page-mobile-projects-activity-list"
          width="100%"
          offset={dimensions.topNavBar.desktop.height - 20}
          _onStick={{ width: 'calc(100% - 20px)' }}
        >
          <ActivityTopbar />
        </StickToTop>
      )}
      <CardLayout w="100%" paddingX="0px">
        <Contributions />
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
