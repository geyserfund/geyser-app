import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { Head } from '@/config/Head'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'

import { FollowProjectModal } from '../components/FollowProjectModal.tsx'
import { useFundingFlowCleanup } from '../hooks/useFollowOnBackModal.ts'
import { useProjectAtom, useRewardsAtom } from '../hooks/useProjectAtom.ts'
import { ProjectNavigation } from '../navigation/ProjectNavigation.tsx'
import { ProjectCreateModal } from '../pages/projectView/components/ProjectCreateModal.tsx'
import { useProjectDraftRedirect } from '../pages/projectView/views/body/hooks/useProjectDraftRedirect.tsx'
import { buildProjectJsonLd } from '../tools/generateProjectJsonLD.ts'
import { useProjectPrerenderSeo } from './hooks/useProjectPrerenderSeo.ts'

export const ProjectLayout = () => {
  useFundingFlowCleanup()
  useProjectDraftRedirect()

  const { project, loading } = useProjectAtom()
  const { rewards, initialRewardsLoading } = useRewardsAtom()

  const { shouldRenderJsonLd, seoCanonicalUrl, seoDescription, seoImage, seoTitle } = useProjectPrerenderSeo({
    project,
    loading,
    initialRewardsLoading,
  })

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
      <Head title={seoTitle} description={seoDescription} image={seoImage} type="article" url={seoCanonicalUrl}>
        {shouldRenderJsonLd && <script type="application/ld+json">{buildProjectJsonLd(project, rewards)}</script>}
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
