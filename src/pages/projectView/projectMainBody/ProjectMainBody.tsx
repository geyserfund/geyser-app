import { useProjectContext } from '../../../context'
import { useProjectDetails } from '../projectNavigation/hooks/useProjectDetails'
import {
  Entries,
  Header,
  LaunchProjectNotice,
  Milestones,
  Rewards,
  Story,
} from './sections'
import { Details } from './sections/Details'

export const ProjectMainBody = () => {
  const { project, isProjectOwner } = useProjectContext()

  const projectDetails = useProjectDetails(project)

  return (
    <>
      <Header />

      {project && isProjectOwner ? (
        <LaunchProjectNotice project={project} />
      ) : null}
      <Story />
      {projectDetails.entriesLength ? <Entries /> : null}
      {projectDetails.rewardsLength ? <Rewards /> : null}
      {projectDetails.milestonesLength ? <Milestones /> : null}
      <Details />
    </>
  )
}
