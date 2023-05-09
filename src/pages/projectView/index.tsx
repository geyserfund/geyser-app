import { Box } from '@chakra-ui/layout'
import { useParams } from 'react-router'

import { ProjectProvider } from '../../context'
import { useFundingFlow } from '../../hooks'
import { useMobileMode } from '../../utils'
import { ProjectContainer } from './ProjectContainer'

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const isMobile = useMobileMode()

  const fundingFlow = useFundingFlow()

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
          bg="brand.bgGrey4"
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <ProjectContainer fundingFlow={fundingFlow} />
        </Box>
      </Box>
    </ProjectProvider>
  )
}
