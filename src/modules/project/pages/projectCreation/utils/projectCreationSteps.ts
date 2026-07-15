import { ProjectCreationStep } from '@/types/index.ts'

export const projectCreationStepIndex = {
  [ProjectCreationStep.ProjectDetails]: 0,
  [ProjectCreationStep.FundingType]: 0,
  [ProjectCreationStep.FundingGoal]: 1,
  [ProjectCreationStep.PerksAndProducts]: 2,
  [ProjectCreationStep.Story]: 3,
  [ProjectCreationStep.AboutYou]: 4,
  [ProjectCreationStep.Wallet]: 5,
  [ProjectCreationStep.TaxId]: 5,
  [ProjectCreationStep.IdentityVerification]: 5,
  [ProjectCreationStep.Launch]: 6,
} as const

/** Returns the next persisted creation step for the wallet flow and overall project creation flow. */
export const getNextProjectCreationStep = (step: ProjectCreationStep): ProjectCreationStep | undefined => {
  const currentStepIndex = projectCreationStepIndex[step]

  return (Object.keys(projectCreationStepIndex) as ProjectCreationStep[]).find(
    (currentStep) => projectCreationStepIndex[currentStep] === currentStepIndex + 1,
  )
}
