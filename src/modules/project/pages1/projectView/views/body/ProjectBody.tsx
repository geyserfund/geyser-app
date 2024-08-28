import { Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'

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
    <Stack w="full" spacing={dimensions.project.rightSideNav.gap} direction={{ base: 'column', lg: 'row' }}>
      <VStack flex={1} w="full" spacing={6} paddingBottom={{ base: 24, lg: 10 }}>
        <FinalizeProjectNotice />
        <Header />
        <CreatorTools />
        <Story />

        {project.rewardsCount && <Rewards />}
        {project.entriesCount && <Posts />}
        {project.goalsCount && <Goals />}
        <Details />
      </VStack>
      <RightSideStickyLayout>
        <ContributionSummary />
        <LeaderboardSummary />
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
