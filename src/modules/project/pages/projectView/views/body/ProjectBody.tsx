import { Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'
import { ProjectPreLaunchNav } from '@/modules/project/navigation/components/ProjectPreLaunchNav.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { isAllOrNothing } from '@/utils/index.ts'

import { ProjectStatus } from '../../../../../../types'
import { useProjectAtom } from '../../../../hooks/useProjectAtom'
import { RewardNotice } from '../../components/RewardNotice.tsx'
import {
  ContributionSummary,
  CreatorTools,
  Details,
  Goals,
  Header,
  LeaderboardSummary,
  Posts,
  Rewards,
  Story,
} from './sections'
import { AonGoToRefundPage } from './sections/AonGoToRefundPage.tsx'
import { AonNotification } from './sections/aonNotification/AonNotification.tsx'
import { BodySectionPageBottomBar } from './sections/BodySectionPageBottomBar.tsx'
import { CreatorVerificationNotice } from './sections/CreatorVerificationNotice.tsx'
import { FundNowWithLightning } from './sections/FundNowWithLightning.tsx'
import { ProjectPromotionNotice } from './sections/ProjectPromotionNotice.tsx'
import { SuggestedProjects } from './sections/SuggestedProjects.tsx'

export const ProjectBody = () => {
  const { project, loading } = useProjectAtom()

  const location = useLocation()
  const navigate = useNavigate()

  const isAon = isAllOrNothing(project)

  useEffect(() => {
    if (loading) return
    if (project?.status === ProjectStatus.Draft && !location.pathname.includes('/draft')) {
      navigate(location.pathname + '/draft', { replace: true })
    } else if (project?.status === ProjectStatus.PreLaunch && !location.pathname.includes('/prelaunch')) {
      navigate(location.pathname + '/prelaunch', { replace: true })
    } else if (project?.status === ProjectStatus.Active && location.pathname.includes('/prelaunch')) {
      navigate(location.pathname.replace('/prelaunch', ''), { replace: true })
    } else if (project?.status === ProjectStatus.Active && location.pathname.includes('/draft')) {
      navigate(location.pathname.replace('/draft', ''), { replace: true })
    }
  }, [project?.status, location.pathname, navigate, project?.name, loading])

  return (
    <Stack w="full" spacing={dimensions.project.rightSideNav.gap} direction={{ base: 'column', lg: 'row' }}>
      <VStack
        flex={1}
        w="full"
        maxWidth={{ base: 'unset', lg: dimensions.project.leftMainContainer.width }}
        minWidth={{ base: 'unset', lg: dimensions.project.leftMainContainer.minWidth }}
        spacing={6}
        paddingBottom={{ base: 28, lg: 10 }}
      >
        <ProjectPreLaunchNav />

        <ProjectPromotionNotice />

        <CreatorVerificationNotice />

        <AonNotification />

        <CreatorTools />

        <Header />

        <RewardNotice />

        <Story />

        {project.rewardsCount && <Rewards />}
        {project.entriesCount && <Posts />}
        {project.goalsCount && <Goals />}
        <Details />
        {!isAon && <FundNowWithLightning />}
        <AonGoToRefundPage />

        <SuggestedProjects
          id={'suggested-projects-project-page'}
          subCategory={project.subCategory}
          projectId={project.id}
        />
        <UserExternalLinksComponent spread />
      </VStack>
      <RightSideStickyLayout
        overflow="auto"
        css={{ '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <ContributionSummary />
        <LeaderboardSummary />
      </RightSideStickyLayout>

      <BodySectionPageBottomBar />
    </Stack>
  )
}
