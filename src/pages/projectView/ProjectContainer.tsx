import { ProjectNav } from '../../components/nav/bottomNav/ProjectNav'
import { Head } from '../../config/Head'
import { ProjectProvider } from '../../context'
import { useFundingFormState } from '../../hooks'
import {
  FundingResourceType,
  Project,
  ProjectReward,
} from '../../types/generated/graphql'
import { useMobileMode } from '../../utils'
import { ProjectActivityPanel } from './projectActivityPanel'
import { ProjectMainBody } from './projectMainBody'
import { ProjectBackButton } from './projectMainBody/components/ProjectBackButton'

type Props = {
  project: Project
  updateProject: (value: Project) => void
  fundingFlow: any
  resourceType?: string
  resourceId?: number
}

export const ProjectContainer = ({
  project,
  updateProject,
  fundingFlow,
}: Props) => {
  const fundForm = useFundingFormState({
    /*
     * Passing an empty array as fallback would probably make
     * more sense but I think at the moment most checks look
     * for an undefined value.
     */
    rewards: (project.rewards as ProjectReward[]) || undefined,
  })

  const isMobile = useMobileMode()

  const { setFundState, fundState } = fundingFlow

  return (
    <ProjectProvider {...{ project, updateProject }}>
      <Head
        title={project.title}
        description={project.description}
        image={project.image || ''}
        type="article"
      />
      <ProjectBackButton />
      <ProjectMainBody
        {...{
          project,
          fundState,
          setFundState,
          updateReward: fundForm.updateReward,
        }}
      />

      <ProjectActivityPanel
        project={project}
        {...{ fundingFlow, fundForm }}
        resourceType={FundingResourceType.Project}
        resourceId={project.id}
      />

      {isMobile && <ProjectNav fixed />}
    </ProjectProvider>
  )
}
