import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../../../context'
import { FundingProvider } from '../../funding/context/FundingFlow'
import { ProjectContainer } from './ProjectContainer'
import { ProjectSideNavigation } from './views/projectNavigation/sideNav'

export const ProjectView = () => {
  const params = useParams<{ projectId: string }>()
  const { projectId } = params
  return (
    <ProjectProvider projectId={projectId || ''}>
      <FundingProvider>
        <ProjectSideNavigation />
        <ProjectContainer />
      </FundingProvider>
    </ProjectProvider>
  )
}

export default ProjectView
