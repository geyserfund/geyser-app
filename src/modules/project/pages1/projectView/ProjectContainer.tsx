import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Head } from '../../../../config'
import { dimensions } from '../../../../constants'
import { GoalDeleteModal, GoalModal, ProjectCreateModal } from './components'
import { useProjectAtom } from './hooks/useProjectAtom'
import { ProjectNavigation } from './navigation/ProjectNavigation'

export const ProjectContainer = () => {
  const { project } = useProjectAtom()

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%" position="relative" bg="utils.pbg">
      <Head
        title={project?.title || ''}
        description={project?.shortDescription || ''}
        image={project?.thumbnailImage || ''}
        type="article"
      />
      <ProjectNavigation />
      <VStack
        maxWidth={dimensions.maxWidth}
        width="100%"
        height="100%"
        overflow="hidden"
        paddingTop={{
          base: `${dimensions.projectNavBar.mobile.height}px`,
          lg: `${dimensions.projectNavBar.desktop.height}px`,
        }}
      >
        <Box w="100%" paddingTop={4}>
          <Outlet />
        </Box>
      </VStack>
      <ProjectCreateModal />
      <GoalModal />
      <GoalDeleteModal />
    </Box>
  )
}
