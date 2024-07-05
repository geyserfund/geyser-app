import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Head } from '../../../../config'
import { dimensions } from '../../../../constants'
import { standardPadding } from '../../../../styles'
import { useProjectAtom } from '../../hooks/useProjectAtom'
import { GoalDeleteModal, GoalModal, ProjectCreateModal } from './components'
import { ProjectNavigation } from './navigation/ProjectNavigation'

export const ProjectContainer = () => {
  const { project } = useProjectAtom()

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      position="relative"
      bg="utils.pbg"
    >
      <Head
        title={project?.title || ''}
        description={project?.shortDescription || ''}
        image={project?.thumbnailImage || ''}
        type="article"
      />
      <ProjectNavigation />
      <VStack
        width="100%"
        height="100%"
        paddingTop={{
          base: `${dimensions.projectNavBar.mobile.height}px`,
          lg: `${dimensions.projectNavBar.desktop.height}px`,
        }}
        paddingX={standardPadding}
        alignItems="center"
      >
        <Box w="100%" maxWidth={dimensions.maxWidth}>
          <Outlet />
        </Box>
      </VStack>
      <ProjectCreateModal />
      <GoalModal />
      <GoalDeleteModal />
    </Box>
  )
}
