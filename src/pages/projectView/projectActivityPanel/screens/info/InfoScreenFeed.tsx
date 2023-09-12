import { Box } from '@chakra-ui/layout'
import { useCallback, useEffect, useState } from 'react'

import { StickToTop } from '../../../../../components/layouts'
import { dimensions, ID } from '../../../../../constants'
import { MobileViews, useProjectContext } from '../../../../../context'
import { useMobileMode } from '../../../../../utils'
import { InfoScreenFeedTabs, ProjectContributionList } from './components'
import { ProjectLeaderboardList } from './components/ProjectLeaderboardList'

let visitedContribution = false
let visitedLeaderboard = false

export const InfoScreenFeed = () => {
  const isMobile = useMobileMode()
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
    if (!project) {
      return null
    }

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
            project={project}
          />
        )}
        {(!isActivity || visitedLeaderboard) && (
          <ProjectLeaderboardList
            display={isActivity && visitedLeaderboard ? 'none' : undefined}
            project={project}
          />
        )}
      </>
    )
  }, [tab, project])

  if (!project) {
    return null
  }

  return (
    <Box
      id={ID.project.activity.feedtabWrapper}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="hidden"
      flex="1"
    >
      <StickToTop
        id={ID.project.activity.feedtab}
        scrollContainerId={ID.root}
        wrapperId={ID.project.activity.feedtabWrapper}
        width="100%"
        offset={dimensions.topNavBar.desktop.height}
        bias={20}
        buffer={10}
        disable={!isMobile}
      >
        <InfoScreenFeedTabs {...{ project, tab, setTab }} />
      </StickToTop>
      {renderActivityList()}
    </Box>
  )
}
