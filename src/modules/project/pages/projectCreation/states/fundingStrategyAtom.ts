import { atom } from 'jotai'

import { ProjectFundingStrategy } from '@/types/index.ts'

export const RecoverableGrantFundingOption = 'RECOVERABLE_GRANT' as const
export const RECOVERABLE_GRANT_DURATION_IN_DAYS = 14

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

/** Returns the fixed Recoverable Grant duration or the selected All-or-Nothing duration. */
export const getProjectAonGoalDurationInDays = (isRecoverableGrant: boolean, duration: number) =>
  isRecoverableGrant ? RECOVERABLE_GRANT_DURATION_IN_DAYS : duration

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
