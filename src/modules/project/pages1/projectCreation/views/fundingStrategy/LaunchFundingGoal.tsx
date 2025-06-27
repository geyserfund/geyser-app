import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'

import { AllOrNothingGoal } from './views/AllOrNothingGoal.tsx'
import { OpenFundingGoal } from './views/OpenFundingGoal.tsx'

export const LaunchFundingGoal = () => {
  const { project } = useProjectAtom()

  if (project.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
    return <AllOrNothingGoal />
  }

  return <OpenFundingGoal />
}
