import { Box } from '@chakra-ui/layout'
import { useParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { ProjectContainer } from './ProjectContainer'
import { ProjectSideNavigation } from './projectNavigation/sideNav'

export const ProjectView = () => {
  const params = useParams<{ projectId: string }>()
  const { projectId } = params
  return (
    <ProjectProvider projectId={projectId || ''}>
      <ProjectSideNavigation />
      <ProjectContainer />
    </ProjectProvider>
  )
}

export default ProjectView
