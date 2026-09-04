import { atom } from 'jotai'

import { ProjectFundingStrategy } from '@/types/index.ts'

export const RecoverableGrantFundingOption = 'RECOVERABLE_GRANT' as const
export const RECOVERABLE_GRANT_DURATION_IN_DAYS = 14

export type ProjectCreationFundingOption = ProjectFundingStrategy | typeof RecoverableGrantFundingOption

export type ProjectCreationFundingContext = {
  fundingStrategy?: ProjectFundingStrategy | null
  isRecoverableGrant?: boolean | null
}

export const projectCreationFundingOptionAtom = atom<ProjectCreationFundingOption>(RecoverableGrantFundingOption)

export const getProjectFundingStrategyInput = (option: ProjectCreationFundingOption) =>
  option === RecoverableGrantFundingOption ? ProjectFundingStrategy.TakeItAll : option

export const getProjectRecoverableGrantInput = (option: ProjectCreationFundingOption) =>
  option === RecoverableGrantFundingOption

/** Returns the fixed Recoverable Grant duration or the selected All-or-Nothing duration. */
export const getProjectAonGoalDurationInDays = (isRecoverableGrant: boolean, duration: number) =>
  isRecoverableGrant ? RECOVERABLE_GRANT_DURATION_IN_DAYS : duration

/** Whether an existing legacy AON project should render its goal editor. */
export const shouldShowAllOrNothingGoalInCreation = (project: ProjectCreationFundingContext) =>
  project.isRecoverableGrant !== true && project.fundingStrategy === ProjectFundingStrategy.AllOrNothing
