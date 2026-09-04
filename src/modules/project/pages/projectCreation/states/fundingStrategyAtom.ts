import { atom } from 'jotai'

import { ProjectFundingStrategy } from '@/types/index.ts'

export const CircularGrantFundingOption = 'CIRCULAR_GRANT' as const
export const CIRCULAR_GRANT_DURATION_IN_DAYS = 14

export type ProjectCreationFundingOption = ProjectFundingStrategy | typeof CircularGrantFundingOption

export type ProjectCreationFundingContext = {
  fundingStrategy?: ProjectFundingStrategy | null
  isCircularGrant?: boolean | null
}

export const projectCreationFundingOptionAtom = atom<ProjectCreationFundingOption>(CircularGrantFundingOption)

export const getProjectFundingStrategyInput = (option: ProjectCreationFundingOption) =>
  option === CircularGrantFundingOption ? ProjectFundingStrategy.TakeItAll : option

export const getProjectCircularGrantInput = (option: ProjectCreationFundingOption) =>
  option === CircularGrantFundingOption

/** Returns the fixed Circular Grant duration or the selected All-or-Nothing duration. */
export const getProjectAonGoalDurationInDays = (isCircularGrant: boolean, duration: number) =>
  isCircularGrant ? CIRCULAR_GRANT_DURATION_IN_DAYS : duration

/** Whether an existing legacy AON project should render its goal editor. */
export const shouldShowAllOrNothingGoalInCreation = (project: ProjectCreationFundingContext) =>
  project.isCircularGrant !== true && project.fundingStrategy === ProjectFundingStrategy.AllOrNothing
