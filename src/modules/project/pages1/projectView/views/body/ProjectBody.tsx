import { Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
  LaunchProjectNotice,
  LeaderboardSummary,
  Posts,
  Rewards,
  Story,
} from './sections'

export const ProjectBody = () => {
  const { project, loading } = useProjectAtom()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (project?.status === ProjectStatus.Draft && !location.pathname.includes('/draft')) {
      navigate(location.pathname + '/draft')
    } else if (project?.status === ProjectStatus.Active && location.pathname.includes('/draft')) {
      navigate(location.pathname.replace('/draft', ''))
    }
  }, [project?.status, location.pathname, navigate, project?.name, loading])

  // const projectDetails = useProjectDetails(project)

  return (
    <Stack w="full" spacing={4} direction={{ base: 'column', lg: 'row' }}>
      <VStack flex={8} w="full" spacing={6} paddingBottom={24}>
        <FinalizeProjectNotice />
        <LaunchProjectNotice />
        <Header />
        <CreatorTools />
        <Story />

        {project.rewardsCount && <Rewards />}
        {project.entriesCount && <Posts />}
        {project.goalsCount && <Goals />}
        <Details />
      </VStack>
      <VStack
        position="sticky"
        top={{
          base: `${dimensions.projectNavBar.mobile.height}px`,
          lg: `${dimensions.projectNavBar.desktop.height}px`,
        }}
        display={{ base: 'none', lg: 'flex' }}
        w="full"
        height={`calc(100vh - ${dimensions.topNavBar.desktop.height + dimensions.projectNavBar.desktop.height}px)`}
        flex={5}
        justifyContent="start"
        paddingBottom={4}
      >
        <ContributionSummary />
        <LeaderboardSummary />
      </VStack>

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
