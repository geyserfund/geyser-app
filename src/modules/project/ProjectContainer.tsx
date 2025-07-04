import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Head } from '@/config/Head'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'

import { FollowProjectModal } from './components/FollowProjectModal.tsx'
import { useFundingFlowCleanup } from './hooks/useFollowOnBackModal.ts'
import { useProjectAtom, useRewardsAtom } from './hooks/useProjectAtom'
import { ProjectNavigation } from './navigation/ProjectNavigation'
import { ProjectCreateModal } from './pages1/projectView/components'
import { useProjectDraftRedirect } from './pages1/projectView/views/body/hooks/useProjectDraftRedirect.tsx'
import { buildProjectJsonLd } from './tools/generateProjectJsonLD.ts'

export const ProjectContainer = () => {
  useFundingFlowCleanup()
  useProjectDraftRedirect()

  const { project, loading } = useProjectAtom()
  const { rewards, initialRewardsLoading } = useRewardsAtom()

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
        url={`https://geyser.fund/project/${project?.name}`}
      >
        {!loading && !initialRewardsLoading && (
          <script type="application/ld+json">{buildProjectJsonLd(project, rewards)}</script>
        )}
      </Head>
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
    </Box>
  )
}
