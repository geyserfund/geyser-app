import { Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { dimensions } from '../../../../../../constants'
import { useStateRef } from '../../../../../../shared/utils/hooks'
import { ProjectStatus } from '../../../../../../types'
import { useProjectAtom } from '../../../../hooks/useProjectAtom'
import {
  ContributionSummary,
  Details,
  Entries,
  FinalizeProjectNotice,
  Goals,
  Header,
  LaunchProjectNotice,
  LeaderboardSummary,
  Rewards,
  ShareProject,
  Story,
} from './sections'

export const ProjectBody = () => {
  const { project, loading } = useProjectAtom()

  const location = useLocation()
  const navigate = useNavigate()

  const { node, ref } = useStateRef<HTMLDivElement>()

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
    <Stack w="full" overflow="visible" spacing={4} direction={{ base: 'column', lg: 'row' }}>
      <VStack flex={8} w="full" spacing={6}>
        <FinalizeProjectNotice />
        <LaunchProjectNotice />
        <Header />
        <Story />
        <ShareProject />
        <Rewards />
        <Entries />
        <Goals />
        <Details />
      </VStack>
      <VStack ref={ref} display={{ base: 'none', lg: 'flex' }} w="full" flex={5} justifyContent="start">
        <VStack
          position="fixed"
          width={node?.offsetWidth || '363px'}
          top={{
            base: `${dimensions.topNavBar.mobile.height + dimensions.projectNavBar.mobile.height}px`,
            lg: `${dimensions.topNavBar.desktop.height + dimensions.projectNavBar.desktop.height}px`,
          }}
          height={`calc(100vh - ${dimensions.topNavBar.desktop.height + dimensions.projectNavBar.desktop.height}px)`}
          left={node?.offsetLeft}
          paddingBottom={4}
        >
          <ContributionSummary />
          <LeaderboardSummary />
        </VStack>
      </VStack>

      {/* <Story />
      <Rewards /> */}
      {/* {projectDetails.entriesLength ? <Entries /> : null}
      {goals.hasGoals ? <Goals /> : null} */}
      {/* <CreatorTools />
      <Details /> */}
    </Stack>
  )
}
