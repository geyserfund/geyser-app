import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'
import { LeaderboardAllTime, LeaderboardThisWeek } from './views'

type ProjectLeaderboardProps = CardLayoutProps

export const ProjectLeaderboard = (props: ProjectLeaderboardProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout padding="20px" {...props}>
      <H3 color={{ base: 'primary.600', mb: 'red' }}>
        {t('Project leaderboard')}
      </H3>
      <Tabs variant="unstyled" size="sm">
        <TabList>
          <Tab {...tabButtonStyles} whiteSpace="nowrap">
            {t('This week')}
          </Tab>
          <Tab {...tabButtonStyles}>{t('All time')}</Tab>
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
  fontSize: '16px',
  fontWeight: 500,
  flex: 1,
  _selected: { backgroundColor: 'neutral.100' },
}
