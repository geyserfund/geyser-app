import { VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants/index.ts'

import { ProjectVisitorBottomBar } from '../../components/ProjectVisitorBottomBar.tsx'
import { RenderGoals } from './common/RenderGoals'
import { CreatorGoalPageBottomBar, CreatorGoalPageTopBar } from './components'

export const ProjectGoals = ({ onNoGoalsProp }: { onNoGoalsProp?: () => void }) => {
  const { project } = useProjectAtom()
  const navigate = useNavigate()

  const onNoGoals = () => {
    navigate(getPath('project', project.name))
  }

  return (
    <VStack w="full" spacing={8} paddingBottom={28}>
      <CreatorGoalPageTopBar />
      <VStack w="full" alignItems={'start'}>
        <RenderGoals onNoGoals={onNoGoalsProp ? onNoGoalsProp : onNoGoals} />
      </VStack>

      <CreatorGoalPageBottomBar />
      <ProjectVisitorBottomBar />
    </VStack>
  )
}
