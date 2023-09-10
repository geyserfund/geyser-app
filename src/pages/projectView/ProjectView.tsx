import { Box } from '@chakra-ui/layout'
import { useParams } from 'react-router'

import { ProjectProvider } from '../../context'
import { ProjectContainer } from './ProjectContainer'

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>()

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
          bg={{ base: 'neutral.0', lg: 'neutral.50' }}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <ProjectContainer />
        </Box>
      </Box>
    </ProjectProvider>
  )
}
