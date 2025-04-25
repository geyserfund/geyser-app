import { Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'

import { dimensions } from '../../../../../../shared/constants'
import { ProjectStatus } from '../../../../../../types'
import { useProjectAtom } from '../../../../hooks/useProjectAtom'
import { BodySectionPageBottomBar } from './components/BodySectionPageBottomBar'
import {
  ContributionSummary,
  CreatorTools,
  Details,
  FinalizeProjectNotice,
  Goals,
  Header,
  LeaderboardSummary,
  Posts,
  Rewards,
  Story,
} from './sections'
import { CreatorVerificationNotice } from './sections/CreatorVerificationNotice.tsx'
import { FollowBoard } from './sections/followboard/FollowBoard.tsx'
import { FollowersSummary } from './sections/FollowersSummary.tsx'
import { PreLaunchProjectNotice } from './sections/PreLaunchProjectNotice.tsx'
import { SuggestedProjects } from './sections/SuggestedProjects.tsx'

export const ProjectBody = () => {
  const { project, loading } = useProjectAtom()

  const location = useLocation()
  const navigate = useNavigate()

  const isPrelaunch = project?.status === ProjectStatus.PreLaunch

  useEffect(() => {
    if (loading) return
    console.log('checking whats with the paths', location.pathname)
    if (project?.status === ProjectStatus.Draft && !location.pathname.includes('/draft')) {
      navigate(location.pathname + '/draft', { replace: true })
    } else if (project?.status === ProjectStatus.PreLaunch && !location.pathname.includes('/prelaunch')) {
      navigate(location.pathname + '/prelaunch', { replace: true })
    } else if (project?.status === ProjectStatus.Active && location.pathname.includes('/prelaunch')) {
      navigate(location.pathname.replace('/prelaunch', ''), { replace: true })
    } else if (project?.status === ProjectStatus.Active && location.pathname.includes('/draft')) {
      navigate(location.pathname.replace('/draft', ''), { replace: true })
    }
  }, [project?.status, location.pathname, navigate, project?.name, loading])

  return (
    <Stack w="full" spacing={dimensions.project.rightSideNav.gap} direction={{ base: 'column', lg: 'row' }}>
      <VStack
        flex={1}
        w="full"
        maxWidth={{ base: 'unset', lg: dimensions.project.leftMainContainer.width }}
        minWidth={{ base: 'unset', lg: dimensions.project.leftMainContainer.minWidth }}
        spacing={6}
        paddingBottom={{ base: 24, lg: 10 }}
      >
        <FinalizeProjectNotice />
        <PreLaunchProjectNotice />
        <CreatorVerificationNotice />

        <Header />
        <CreatorTools />
        <Story />

        {project.rewardsCount && <Rewards />}
        {project.entriesCount && <Posts />}
        {project.goalsCount && <Goals />}
        <Details />
        <SuggestedProjects subCategory={project.subCategory} projectId={project.id} />
        <UserExternalLinksComponent spread />
      </VStack>
      <RightSideStickyLayout
        overflow="auto"
        css={{ '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {isPrelaunch ? <FollowersSummary /> : <ContributionSummary />}
        {isPrelaunch ? <FollowBoard /> : <LeaderboardSummary />}
      </RightSideStickyLayout>

      {/* <Story />
      <Rewards /> */}
      {/* {projectDetails.entriesLength ? <Entries /> : null}
      {goals.hasGoals ? <Goals /> : null} */}
      {/* <CreatorTools />
      <Details /> */}
      <BodySectionPageBottomBar />
    </Stack>
  )
}
