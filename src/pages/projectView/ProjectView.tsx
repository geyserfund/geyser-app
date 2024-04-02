import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { FundingProvider } from '../projectFunding/context/FundingFlow'
import { ProjectContainer } from './ProjectContainer'
import { ProjectSideNavigation } from './projectNavigation/sideNav'

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
