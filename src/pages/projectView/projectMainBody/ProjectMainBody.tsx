import { VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../../context'
import { useProjectDetails } from '../projectNavigation/hooks/useProjectDetails'
import {
  CreatorTools,
  Entries,
  Header,
  LaunchProjectNotice,
  Milestones,
  Rewards,
  ShareProject,
  Story,
} from './sections'
import { Details } from './sections/Details'

export const ProjectMainBody = () => {
  const { project, isProjectOwner } = useProjectContext()

  const projectDetails = useProjectDetails(project)
  return (
    <VStack w="full" spacing="20px" overflow="visible">
      <Header />

      {project && isProjectOwner ? <LaunchProjectNotice project={project} /> : null}
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
