import { Box, HStack } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { ScopeProvider } from 'jotai-scope'
import { Outlet, useParams } from 'react-router'

import { ProjectProvider } from '@/modules/project/context'
import { initialProjectDetailsLoadAtom, projectAtom, projectLoadingAtom } from '@/modules/project/state/projectAtom.ts'
import { initialProjectGrantApplicationsLoadAtom } from '@/modules/project/state/projectAtom.ts'
import { projectFormErrorAtom } from '@/modules/project/state/projectFormAtom.ts'
import { formProjectAtom } from '@/modules/project/state/projectFormAtom.ts'
import { initialRewardsLoadAtom, rewardsAtom } from '@/modules/project/state/rewardsAtom.ts'
import { walletAtom, walletConnectionDetailsAtom, walletLoadingAtom } from '@/modules/project/state/walletAtom.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import { toInt } from '@/utils'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import { ProjectCreationNavigationDesktop } from './components/ProjectCreationNavigation.tsx'
import { useMustHaveProjectStory } from './hooks/useMustHaveProjectStory.tsx'

const listOfAtoms = [
  projectAtom,
  projectLoadingAtom,
  initialProjectDetailsLoadAtom,
  initialProjectGrantApplicationsLoadAtom,
  rewardsAtom,
  initialRewardsLoadAtom,
  walletAtom,
  walletConnectionDetailsAtom,
  walletLoadingAtom,
  formProjectAtom,
  projectFormErrorAtom,
]

export const ProjectCreationContainer = () => {
  const { projectId } = useParams<{ projectId: string }>()

  const isProjectId = projectId && projectId !== 'new'

  return (
    <ScopeProvider atoms={listOfAtoms}>
      <ProjectProvider projectId={isProjectId ? toInt(projectId) : undefined}>
        <ProjectCreationContainerContent />
      </ProjectProvider>
    </ScopeProvider>
  )
}

const ProjectCreationContainerContent = () => {
  useMustHaveProjectStory()

  // const { loading } = useProjectAtom()

  // if (loading) {
  //   return null
  // }

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
