import { Box } from '@chakra-ui/layout'
import { useCallback, useState } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { StickToTop } from '../../../../../../../../../shared/components/layouts'
import { dimensions, ID } from '../../../../../../../../../shared/constants'
import { InfoScreenFeedTabs, ProjectContributionList } from '../components'
import { ProjectLeaderboardList } from '../components/ProjectLeaderboardList'

let visitedContribution = false
let visitedLeaderboard = false

export const InfoScreenFeed = ({ id, isBounded }: { id?: string; isBounded?: boolean }) => {
  const { project } = useProjectAtom()

  const [tab, _] = useState()

  // useEffect(() => {
  //   if (mobileView === MobileViews.contribution) {
  //     setTab(MobileViews.contribution)
  //   } else if (mobileView === MobileViews.leaderboard) {
  //     setTab(MobileViews.leaderboard)
  //   }

  //   return () => {
  //     visitedContribution = false
  //     visitedLeaderboard = false
  //   }
  // }, [mobileView])

  // const stickToTopEnable =
  //   (mobileView === MobileViews.contribution || mobileView === MobileViews.leaderboard) && isMobile

  const renderActivityList = useCallback(() => {
    if (!project) {
      return null
    }

    const isActivity = tab === 'MobileViews.contribution'

    if (isActivity) {
      visitedContribution = true
    } else {
      visitedLeaderboard = true
    }

    return (
      <>
        {(isActivity || visitedContribution) && (
          <ProjectContributionList
            isBounded={isBounded}
            id={`${id}-${ID.project.activity.contribution}`}
            display={!isActivity && visitedContribution ? 'none' : undefined}
            project={project}
          />
        )}
        {(!isActivity || visitedLeaderboard) && (
          <ProjectLeaderboardList
            isBounded={isBounded}
            id={`${id}-${ID.project.activity.leaderboard}`}
            display={isActivity && visitedLeaderboard ? 'none' : undefined}
            project={project}
          />
        )}
      </>
    )
  }, [tab, project, isBounded, id])

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
        wrapperId={ID.project.activity.feedtabWrapper}
        width="100%"
        offset={dimensions.topNavBar.desktop.height}
        bias={10}
        buffer={10}
        // disable={!stickToTopEnable}
      >
        <InfoScreenFeedTabs {...{ project }} />
      </StickToTop>
      {renderActivityList()}
    </Box>
  )
}
