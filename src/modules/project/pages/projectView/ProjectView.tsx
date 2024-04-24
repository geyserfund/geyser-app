import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { FundingProviderWithProjectContext } from '../../context/FundingProvider'
import { ProjectContainer } from './ProjectContainer'
import { ProjectSideNavigation } from './views/projectNavigation/sideNav'

export const ProjectView = () => {
  const params = useParams<{ projectId: string }>()
  const { projectId } = params
  return (
    <ProjectProvider projectId={projectId || ''}>
      <FundingProviderWithProjectContext>
        <ProjectSideNavigation />
        <ProjectContainer />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}

export default ProjectView
