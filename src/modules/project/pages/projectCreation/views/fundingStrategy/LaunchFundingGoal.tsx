import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'

import { shouldShowAllOrNothingGoalInCreation } from '../../states/fundingStrategyAtom.ts'
import { AllOrNothingGoal } from './views/AllOrNothingGoal.tsx'
import { OpenFundingGoal } from './views/OpenFundingGoal.tsx'

export const LaunchFundingGoal = () => {
  const { project } = useProjectAtom()

  if (shouldShowAllOrNothingGoalInCreation(project)) {
    return <AllOrNothingGoal />
  }

  return <OpenFundingGoal />
}
