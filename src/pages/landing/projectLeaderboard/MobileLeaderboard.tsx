import { HStack, useTheme, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CardLayout, StickToTop } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { getPath, ID } from '../../../constants'
import { LeaderboardAllTime, LeaderboardThisWeek } from './views'

enum LeaderboardTabs {
  thisWeek = 'this-week',
  allTime = 'all-time',
}

export const MobileLeaderboard = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    if (window.innerWidth > theme.__breakpoints?.get('lg')?.minW) {
      navigate(getPath('landingPage'))
    }
  }, [])

  const [tab, setTab] = useState<LeaderboardTabs>(LeaderboardTabs.thisWeek)

  const renderTabs = () => {
    return (
      <>
        <LeaderboardThisWeek
          display={tab === LeaderboardTabs.thisWeek ? 'flex' : 'none'}
          items={20}
        />
        <LeaderboardAllTime
          display={tab === LeaderboardTabs.allTime ? 'flex' : 'none'}
          items={20}
        />
      </>
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
      <VStack id={ID.leaderboard.wrapper} maxWidth="500px" width="100%">
        <StickToTop
          id={ID.leaderboard.body}
          wrapperId={ID.leaderboard.wrapper}
          width="100%"
        >
          <LeaderboardTopbar tab={tab} setTab={setTab} />
        </StickToTop>
      </VStack>

      <VStack maxWidth="500px" width="100%" spacing="0px" position="relative">
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
    <VStack w="full" spacing="0px">
      <HStack
        width="100%"
        borderBottom="2px solid"
        borderColor="neutral.200"
        paddingY="6px"
      >
        <Body1 semiBold color="black">
          Activity
        </Body1>
      </HStack>
      <HStack
        width="100%"
        borderBottom="2px solid"
        borderColor="neutral.200"
        paddingY="6px"
      >
        <ButtonComponent
          noBorder
          flex={1}
          size="sm"
          fontSize="16px"
          borderRadius="8px"
          backgroundColor={
            tab === LeaderboardTabs.thisWeek ? 'neutral.100' : 'neutral.0'
          }
          onClick={() => setTab(LeaderboardTabs.thisWeek)}
        >
          This week
        </ButtonComponent>
        <ButtonComponent
          noBorder
          flex={1}
          size="sm"
          fontSize="16px"
          borderRadius="8px"
          backgroundColor={
            tab === LeaderboardTabs.allTime ? 'neutral.100' : 'neutral.0'
          }
          onClick={() => setTab(LeaderboardTabs.allTime)}
        >
          All time
        </ButtonComponent>
      </HStack>
    </VStack>
  )
}
