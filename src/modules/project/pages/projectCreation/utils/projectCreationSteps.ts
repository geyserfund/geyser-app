import { ProjectCreationStep } from '@/types/index.ts'

export const projectCreationStepIndex = {
  [ProjectCreationStep.ProjectDetails]: 0,
  [ProjectCreationStep.FundingType]: 1,
  [ProjectCreationStep.FundingGoal]: 2,
  [ProjectCreationStep.PerksAndProducts]: 3,
  [ProjectCreationStep.Story]: 4,
  [ProjectCreationStep.AboutYou]: 5,
  [ProjectCreationStep.Wallet]: 6,
  [ProjectCreationStep.TaxId]: 7,
  [ProjectCreationStep.IdentityVerification]: 8,
  [ProjectCreationStep.FiatContributions]: 9,
  [ProjectCreationStep.Launch]: 10,
} as const

/** Returns the next persisted creation step for the wallet flow and overall project creation flow. */
export const getNextProjectCreationStep = (step: ProjectCreationStep): ProjectCreationStep | undefined => {
  const currentStepIndex = projectCreationStepIndex[step]

  return (Object.keys(projectCreationStepIndex) as ProjectCreationStep[]).find(
    (currentStep) => projectCreationStepIndex[currentStep] === currentStepIndex + 1,
  )
}
