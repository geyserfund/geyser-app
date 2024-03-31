import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { ProjectContainer } from './ProjectContainer'
import { ProjectSideNavigation } from './projectNavigation/sideNav'

export const ProjectView = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params
  return (
    <ProjectProvider projectName={projectName || ''}>
      <ProjectSideNavigation />
      <ProjectContainer />
    </ProjectProvider>
  )
}

export default ProjectView
