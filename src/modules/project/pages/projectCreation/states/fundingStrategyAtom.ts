import { atom } from 'jotai'

import { ProjectFundingStrategy } from '@/types/index.ts'

export const RecoverableGrantFundingOption = 'RECOVERABLE_GRANT' as const

export type ProjectCreationFundingOption = ProjectFundingStrategy | typeof RecoverableGrantFundingOption

export type ProjectCreationFundingContext = {
  fundingStrategy?: ProjectFundingStrategy | null
  isRecoverableGrant?: boolean | null
}

export const projectCreationFundingOptionAtom = atom<ProjectCreationFundingOption>(ProjectFundingStrategy.TakeItAll)

export const getProjectFundingStrategyInput = (option: ProjectCreationFundingOption) =>
  option === RecoverableGrantFundingOption ? ProjectFundingStrategy.AllOrNothing : option

export const getProjectRecoverableGrantInput = (option: ProjectCreationFundingOption) =>
  option === RecoverableGrantFundingOption

/** Whether the creation funding-goal step should render All-or-Nothing options. */
export const shouldShowAllOrNothingGoalInCreation = (
  project: ProjectCreationFundingContext,
  selectedFundingOption: ProjectCreationFundingOption,
) => {
  if (project.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
    return true
  }

  if (project.isRecoverableGrant) {
    return true
  }

  if (project.fundingStrategy === ProjectFundingStrategy.TakeItAll) {
    return false
  }

  return (
    selectedFundingOption === ProjectFundingStrategy.AllOrNothing ||
    selectedFundingOption === RecoverableGrantFundingOption
  )
}
