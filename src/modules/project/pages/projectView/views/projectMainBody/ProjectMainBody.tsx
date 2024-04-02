import { VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../../../../../context'
import { useProjectDetails } from '../projectNavigation/hooks/useProjectDetails'
import {
  CreatorTools,
  Details,
  Entries,
  FinalizeProjectNotice,
  Header,
  LaunchProjectNotice,
  Milestones,
  Rewards,
  ShareProject,
  Story,
} from './sections'

export const ProjectMainBody = () => {
  const { project } = useProjectContext()

  const projectDetails = useProjectDetails(project)
  return (
    <VStack w="full" spacing="20px" overflow="visible">
      <FinalizeProjectNotice />
      <LaunchProjectNotice />
      <Header />

      <Story />
      <ShareProject />
      <Rewards />
      {projectDetails.entriesLength ? <Entries /> : null}
      {projectDetails.milestonesLength ? <Milestones /> : null}
      <CreatorTools />
      <Details />
    </VStack>
  )
}
