import { Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'
import { ProjectPreLaunchNav } from '@/modules/project/navigation/components/ProjectPreLaunchNav.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'

import { ProjectStatus } from '../../../../../../types'
import { useProjectAtom } from '../../../../hooks/useProjectAtom'
import { RewardNotice } from '../../components/RewardNotice.tsx'
import {
  ContributionSummary,
  ControlPanel,
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
import {
  type ProjectImpactFundRecipient,
  ImpactFundRecipientBanner,
} from './sections/header/components/ImpactFundRecipientBadge.tsx'
import { SuggestedProjects } from './sections/SuggestedProjects.tsx'

export const ProjectBody = () => {
  const { project, loading } = useProjectAtom()

  const location = useLocation()
  const navigate = useNavigate()

  const { impactFundRecipient } = project as typeof project & {
    impactFundRecipient?: ProjectImpactFundRecipient | null
  }

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

        <CreatorVerificationNotice />

        <AonNotification />

        <ControlPanel />

        <Header />
        <ImpactFundRecipientBanner recipient={impactFundRecipient} />
        <RewardNotice />

        <Story />

        {project.rewardsCount && <Rewards />}
        {project.entriesCount && <Posts />}
        {project.goalsCount && <Goals />}
        <Details />
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
