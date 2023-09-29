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
import { CreatorSocial } from './sections/CreatorSocial'

export const ProjectMainBody = () => {
  const { project, isProjectOwner } = useProjectContext()

  const projectDetails = useProjectDetails(project)

  return (
    <>
      <Header />

      {project && isProjectOwner ? (
        <LaunchProjectNotice project={project} />
      ) : null}

      <CreatorSocial />

      <Story />

      {projectDetails.entriesLength ? <Entries /> : null}
      {projectDetails.rewardsLength ? <Rewards /> : null}
      {projectDetails.milestonesLength ? <Milestones /> : null}
    </>
  )
}
