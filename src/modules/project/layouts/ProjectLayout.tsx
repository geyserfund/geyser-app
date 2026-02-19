import { Box, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { Outlet } from 'react-router'

import { Head } from '@/config/Head'
import { showProjectNavBarForMobileAtom } from '@/modules/project/navigation/projectNavigationAtom.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'
import { useMobileMode } from '@/utils/index.ts'

import { FollowProjectModal } from '../components/FollowProjectModal.tsx'
import { useFundingFlowCleanup } from '../hooks/useFollowOnBackModal.ts'
import { useProjectAtom, useRewardsAtom } from '../hooks/useProjectAtom.ts'
import { ProjectNavigation } from '../navigation/ProjectNavigation.tsx'
import { ProjectCreateModal } from '../pages/projectView/components/ProjectCreateModal.tsx'
import { useProjectDraftRedirect } from '../pages/projectView/views/body/hooks/useProjectDraftRedirect.tsx'
import { buildProjectJsonLd } from '../tools/generateProjectJsonLD.ts'

export const ProjectLayout = () => {
  useFundingFlowCleanup()
  useProjectDraftRedirect()

  const { isProjectOwner, project, loading } = useProjectAtom()
  const { rewards, initialRewardsLoading } = useRewardsAtom()
  const isMobile = useMobileMode()
  const showProjectNavBarForMobile = useAtomValue(showProjectNavBarForMobileAtom)

  const mobileProjectNavOffset =
    isMobile && showProjectNavBarForMobile && isProjectOwner ? dimensions.projectNavBar.mobile.height : 0

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
          base: `${mobileProjectNavOffset}px`,
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
