import { Box } from '@chakra-ui/layout'
import { useCallback, useEffect, useState } from 'react'

import { MobileViews, useProjectContext } from '../../../../../context'
import { InfoScreenFeedTabs, ProjectContributionList } from './components'
import { ProjectLeaderboardList } from './components/ProjectLeaderboardList'

export const InfoScreenFeed = () => {
  const { mobileView, project } = useProjectContext()

  const [tab, setTab] = useState('activity')

  useEffect(() => {
    if (mobileView === MobileViews.contribution) {
      setTab('activity')
    } else if (mobileView === MobileViews.leaderboard) {
      setTab('leaderBoard')
    }
  }, [mobileView])

  const renderActivityList = useCallback(() => {
    if (tab === 'activity') {
      return <ProjectContributionList />
    }

    return <ProjectLeaderboardList />
  }, [tab])

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="hidden"
      flex="1"
    >
      <InfoScreenFeedTabs {...{ project, tab, setTab }} />
      {renderActivityList()}
    </Box>
  )
}
