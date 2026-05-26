import { VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { shouldShowProjectGoals } from '@/modules/project/utils/shouldShowProjectGoals.ts'
import { getPath } from '@/shared/constants/index.ts'

import { RenderGoals } from './common/RenderGoals'
import { CreatorGoalPageBottomBar, CreatorGoalPageTopBar } from './components'

export const ProjectGoals = ({ onNoGoalsProp }: { onNoGoalsProp?: () => void }) => {
  const { project, loading } = useProjectAtom()
  const navigate = useNavigate()
  const location = useLocation()
  const isDashboardRoute = location.pathname.split('/').includes('dashboard')

  const onNoGoals = () => {
    navigate(getPath('project', project.name))
  }

  useEffect(() => {
    if (!loading && !isDashboardRoute && !shouldShowProjectGoals(project)) {
      navigate(getPath('project', project.name), { replace: true })
    }
  }, [isDashboardRoute, loading, navigate, project])

  if (!loading && !isDashboardRoute && !shouldShowProjectGoals(project)) {
    return null
  }

  return (
    <VStack w="full" spacing={8} paddingBottom={28}>
      <CreatorGoalPageTopBar />
      <VStack w="full" alignItems={'start'}>
        <RenderGoals onNoGoals={onNoGoalsProp ? onNoGoalsProp : onNoGoals} />
      </VStack>

      <CreatorGoalPageBottomBar />
    </VStack>
  )
}
