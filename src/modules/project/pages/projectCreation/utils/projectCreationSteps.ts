import { ProjectCreationStep } from '@/types/index.ts'

export const projectCreationStepIndex = {
  [ProjectCreationStep.ProjectDetails]: 0,
  [ProjectCreationStep.FundingType]: 0,
  [ProjectCreationStep.FundingGoal]: 1,
  [ProjectCreationStep.PerksAndProducts]: 2,
  [ProjectCreationStep.Story]: 2,
  [ProjectCreationStep.AboutYou]: 3,
  [ProjectCreationStep.Launch]: 5,
  // Retained only to interpret historical persisted creation steps.
  [ProjectCreationStep.Wallet]: 4,
  [ProjectCreationStep.TaxId]: 4,
  [ProjectCreationStep.IdentityVerification]: 4,
} as const

/** Maps persisted creation steps, including retired values, onto the active creation flow. */
export const getNextProjectCreationStep = (step: ProjectCreationStep): ProjectCreationStep | undefined => {
  const currentStepIndex = projectCreationStepIndex[step]

  return (Object.keys(projectCreationStepIndex) as ProjectCreationStep[]).find(
    (currentStep) => projectCreationStepIndex[currentStep] === currentStepIndex + 1,
  )
}
