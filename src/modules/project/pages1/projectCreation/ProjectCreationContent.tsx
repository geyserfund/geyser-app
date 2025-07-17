import { Box, HStack, useBreakpointValue } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ProjectCreationNavigationMobile } from './components/ProjectCreationNavigation.tsx'
import { ProjectCreationNavigationDesktop } from './components/ProjectCreationNavigation.tsx'

export const ProjectCreationContentMain = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  const params = useParams<{ projectId: string }>()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isMobile) {
      navigate(getPath('launchProjectDetails', params.projectId))
    }
  }, [isMobile, navigate, params.projectId])

  if (isMobile) {
    return <ProjectCreationNavigationMobile />
  }

  return null
}

export const ProjectCreationContainerContentDesktop = () => {
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
