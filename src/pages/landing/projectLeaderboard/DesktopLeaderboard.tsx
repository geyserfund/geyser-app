import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from '@chakra-ui/react'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'
import { LeaderboardAllTime, LeaderboardThisWeek } from './views'

type ProjectLeaderboardProps = CardLayoutProps

export const ProjectLeaderboard = (props: ProjectLeaderboardProps) => {
  return (
    <CardLayout padding="20px" {...props}>
      <H3 color="brand.primary600">Project leaderboard</H3>
      <Tabs variant="unstyled">
        <TabList>
          <Tab {...tabButtonStyles}>This week</Tab>
          <Tab {...tabButtonStyles}>All time</Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding="0px">
            <LeaderboardThisWeek />
          </TabPanel>
          <TabPanel padding="0px">
            <LeaderboardAllTime />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CardLayout>
  )
}

const tabButtonStyles: TabProps = {
  borderRadius: '8px',
  flex: 1,
  _selected: { backgroundColor: 'neutral.100' },
}
