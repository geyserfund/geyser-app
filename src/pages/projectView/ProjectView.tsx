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
      <ProjectSideNavigation>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          pb={{ base: '80px', lg: '0px' }}
        >
          <Box
            width="100%"
            height="100%"
            display="flex"
            overflow="hidden"
            position="relative"
            bg={{ base: 'neutral.0', lg: 'neutral.50' }}
            flexDirection={{ base: 'column', lg: 'row' }}
          >
            <ProjectContainer />
          </Box>
        </Box>
      </ProjectSideNavigation>
    </ProjectProvider>
  )
}

export default ProjectView
