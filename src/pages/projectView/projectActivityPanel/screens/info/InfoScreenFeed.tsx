import { Box } from '@chakra-ui/layout'
import { useCallback, useEffect, useState } from 'react'

import { MobileViews, useProjectContext } from '../../../../../context'
import { InfoScreenFeedTabs, ProjectContributionList } from './components'
import { ProjectLeaderboardList } from './components/ProjectLeaderboardList'

let visitedContribution = false
let visitedLeaderboard = false

export const InfoScreenFeed = () => {
  const { mobileView, project } = useProjectContext()

  const [tab, setTab] = useState('activity')

  useEffect(() => {
    if (mobileView === MobileViews.contribution) {
      setTab('activity')
    } else if (mobileView === MobileViews.leaderboard) {
      setTab('leaderBoard')
    }

    return () => {
      visitedContribution = false
      visitedLeaderboard = false
    }
  }, [mobileView])
  const renderActivityList = useCallback(() => {
    const isActivity = tab === 'activity'

    if (isActivity) {
      visitedContribution = true
    } else {
      visitedLeaderboard = true
    }

    return (
      <>
        {(isActivity || visitedContribution) && (
          <ProjectContributionList
            display={!isActivity && visitedContribution ? 'none' : undefined}
          />
        )}
        {(!isActivity || visitedLeaderboard) && (
          <ProjectLeaderboardList
            display={isActivity && visitedLeaderboard ? 'none' : undefined}
          />
        )}
      </>
    )
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
