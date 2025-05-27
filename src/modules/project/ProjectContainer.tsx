import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Head } from '@/config/Head'
import { standardPadding } from '@/shared/styles'

import { dimensions } from '../../shared/constants'
import { FollowProjectModal } from './components/FollowProjectModal.tsx'
import { useFundingFlowCleanup } from './hooks/useFollowOnBackModal.ts'
import { useProjectAtom } from './hooks/useProjectAtom'
import { ProjectNavigation } from './navigation/ProjectNavigation'
import { GoalDeleteModal, GoalModal, ProjectCreateModal } from './pages1/projectView/components'

export const ProjectContainer = () => {
  useFundingFlowCleanup()

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
        <Box w="100%" height="100%" maxWidth={dimensions.maxWidth}>
          <Outlet />
        </Box>
      </VStack>
      <ProjectCreateModal />
      <FollowProjectModal />
      <GoalModal />
      <GoalDeleteModal />
    </Box>
  )
}
