import { Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'
import { ProjectPreLaunchNav } from '@/modules/project/navigation/components/ProjectPreLaunchNav.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'

import { ProjectStatus } from '../../../../../../types'
import { useProjectAtom } from '../../../../hooks/useProjectAtom'
import { GoalModal } from '../../components/GoalModal.tsx'
import { BodySectionPageBottomBar } from './components/BodySectionPageBottomBar'
import {
  ContributionSummary,
  CreatorTools,
  Details,
  FinalizeProjectNotice,
  Goals,
  Header,
  LeaderboardSummary,
  Posts,
  Rewards,
  Story,
} from './sections'
import { CreatorVerificationNotice } from './sections/CreatorVerificationNotice.tsx'
import { SuggestedProjects } from './sections/SuggestedProjects.tsx'

export const ProjectBody = () => {
  const { project, loading } = useProjectAtom()

  const location = useLocation()
  const navigate = useNavigate()

  const onGoalCreated = () => {
    navigate(getPath('projectGoals', project.name))
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
        paddingBottom={{ base: 24, lg: 10 }}
      >
        <ProjectPreLaunchNav />
        <FinalizeProjectNotice />
        <CreatorVerificationNotice />

        <CreatorTools />

        <Header />
        <Story />

        {project.rewardsCount && <Rewards />}
        {project.entriesCount && <Posts />}
        {project.goalsCount && <Goals />}
        <Details />
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
      <GoalModal onGoalCreated={onGoalCreated} />
    </Stack>
  )
}
