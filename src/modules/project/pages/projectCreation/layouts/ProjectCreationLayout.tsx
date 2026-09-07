import { Box, HStack, VStack, useBreakpointValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Outlet } from 'react-router'

import { isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ProjectCreationNavigationMobile } from '../components/ProjectCreationNavigation.tsx'
import { ProjectCreationNavigationDesktop } from '../components/ProjectCreationNavigation.tsx'
import { DeprecatedProjectCreation } from '../views/DeprecatedProjectCreation.tsx'

export const ProjectCreationLayoutMain = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { project, loading } = useProjectAtom()

  const params = useParams<{ projectId: string }>()

  const navigate = useNavigate()
  const isManagedCircularGrant = isManagedCircularGrantProject(project)

  useEffect(() => {
    if (!loading && !isMobile && (!project.id || isManagedCircularGrant)) {
      navigate(getPath('launchFundingStrategy', params.projectId || 'new'))
    }
  }, [isManagedCircularGrant, isMobile, loading, navigate, params.projectId, project.id])

  if (loading) {
    return null
  }

  if (project.id && !isManagedCircularGrant) {
    return <DeprecatedProjectCreation />
  }

  if (isMobile) {
    return <ProjectCreationNavigationMobile />
  }

  return null
}

export const ProjectCreationLayoutDesktop = () => {
  const { project, loading } = useProjectAtom()

  if (loading) {
    return null
  }

  if (project.id && !isManagedCircularGrantProject(project)) {
    return <DeprecatedProjectCreation />
  }

  return (
    <VStack width="100%" height="100%" paddingX={standardPadding} alignItems="center">
      <HStack
        w="100%"
        height="100%"
        maxWidth={dimensions.maxWidth}
        alignItems="start"
        gap={{ base: 8, lg: 12, xl: 16 }}
        position="relative"
      >
        <ProjectCreationNavigationDesktop />
        <Box flex={1} maxWidth="100%" height="100%">
          <Outlet />
        </Box>
        <Box minWidth="150px" display={{ base: 'none', xl: 'block' }} />
      </HStack>
    </VStack>
  )
}
