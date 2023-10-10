import { useProjectContext } from '../../../context'
import { useProjectDetails } from '../projectNavigation/hooks/useProjectDetails'
import {
  ContributeShare,
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
      <ContributeShare />
      <Details />
      {projectDetails.entriesLength ? <Entries /> : null}
      {projectDetails.rewardsLength ? <Rewards /> : null}
      {projectDetails.milestonesLength ? <Milestones /> : null}
    </>
  )
}
