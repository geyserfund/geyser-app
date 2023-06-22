import { Box } from '@chakra-ui/layout'
import { useParams } from 'react-router'

import { ProjectProvider } from '../../context'
import { useMobileMode } from '../../utils'
import { ProjectContainer } from './ProjectContainer'

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const isMobile = useMobileMode()

  return (
    <ProjectProvider projectId={projectId || ''}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          overflow="hidden"
          position="relative"
          bg="neutral.50"
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <ProjectContainer />
        </Box>
      </Box>
    </ProjectProvider>
  )
}

export default ProjectView
