import { HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import { CardLayout, StickToTop } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { dimensions } from '../../../constants'
import { LeaderboardAllTime, LeaderboardThisWeek } from './views'

enum LeaderboardTabs {
  thisWeek = 'this-week',
  allTime = 'all-time',
}

export const MobileLeaderboard = () => {
  const [tab, setTab] = useState<LeaderboardTabs>(LeaderboardTabs.thisWeek)

  const renderTabs = () => {
    return (
      <VStack>
        <LeaderboardThisWeek
          display={tab === LeaderboardTabs.thisWeek ? 'flex' : 'none'}
          items={20}
        />
        <LeaderboardAllTime
          display={tab === LeaderboardTabs.allTime ? 'flex' : 'none'}
          items={20}
        />
      </VStack>
    )
  }

  return (
    <CardLayout
      noborder
      paddingTop="0px"
      padding="10px"
      w="full"
      direction="column"
      alignItems={'center'}
      position="relative"
    >
      <LeaderboardTopbar tab={tab} setTab={setTab} />

      <VStack maxWidth="500px" spacing="0px" position="relative">
        {renderTabs()}
      </VStack>
    </CardLayout>
  )
}

export const LeaderboardTopbar = ({
  tab,
  setTab,
}: {
  tab: LeaderboardTabs
  setTab: React.Dispatch<React.SetStateAction<LeaderboardTabs>>
}) => {
  return (
    <StickToTop
      id="landing-page-mobile-projects-leaderboard-list"
      width="100%"
      offset={dimensions.topNavBar.desktop.height - 20}
      _onStick={{ width: 'calc(100% - 20px)' }}
    >
      <HStack
        width="100%"
        borderBottom="2px solid"
        borderColor="brand.neutral200"
        paddingY="6px"
      >
        <Body1 semiBold color="black">
          Activity
        </Body1>
      </HStack>
      <HStack
        width="100%"
        borderBottom="2px solid"
        borderColor="brand.neutral200"
        paddingY="6px"
      >
        <ButtonComponent
          noBorder
          flex={1}
          borderRadius="8px"
          backgroundColor={
            tab === LeaderboardTabs.thisWeek ? 'neutral.100' : 'white'
          }
          onClick={() => setTab(LeaderboardTabs.thisWeek)}
        >
          This week
        </ButtonComponent>
        <ButtonComponent
          noBorder
          flex={1}
          borderRadius="8px"
          backgroundColor={
            tab === LeaderboardTabs.allTime ? 'neutral.100' : 'white'
          }
          onClick={() => setTab(LeaderboardTabs.allTime)}
        >
          All time
        </ButtonComponent>
      </HStack>
    </StickToTop>
  )
}
