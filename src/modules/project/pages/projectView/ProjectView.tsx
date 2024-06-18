import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { FundingProviderWithProjectContext } from '../../context/FundingProvider'
import { ProjectContainer } from './ProjectContainer'
import { ProjectSideNavigation } from './views/projectNavigation/sideNav'

export const ProjectView = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params

  console.log('checking projhect name', projectName)
  return (
    <ProjectProvider projectName={projectName}>
      <FundingProviderWithProjectContext>
        <ProjectSideNavigation />
        <ProjectContainer />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}

export default ProjectView
