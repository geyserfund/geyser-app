import { useAtomValue } from 'jotai'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'

import {
  projectCreationFundingOptionAtom,
  shouldShowAllOrNothingGoalInCreation,
} from '../../states/fundingStrategyAtom.ts'
import { AllOrNothingGoal } from './views/AllOrNothingGoal.tsx'
import { OpenFundingGoal } from './views/OpenFundingGoal.tsx'

export const LaunchFundingGoal = () => {
  const { project } = useProjectAtom()
  const selectedFundingOption = useAtomValue(projectCreationFundingOptionAtom)

  if (shouldShowAllOrNothingGoalInCreation(project, selectedFundingOption)) {
    return <AllOrNothingGoal />
  }

  return <OpenFundingGoal />
}
