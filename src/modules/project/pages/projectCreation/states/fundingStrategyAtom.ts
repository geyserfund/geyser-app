import { atom } from 'jotai'

import { ProjectFundingStrategy } from '@/types/index.ts'

export const RecoverableGrantFundingOption = 'RECOVERABLE_GRANT' as const

export type ProjectCreationFundingOption = ProjectFundingStrategy | typeof RecoverableGrantFundingOption

export const projectCreationFundingOptionAtom = atom<ProjectCreationFundingOption>(ProjectFundingStrategy.TakeItAll)

export const getProjectFundingStrategyInput = (option: ProjectCreationFundingOption) =>
  option === RecoverableGrantFundingOption ? ProjectFundingStrategy.AllOrNothing : option

export const getProjectRecoverableGrantInput = (option: ProjectCreationFundingOption) =>
  option === RecoverableGrantFundingOption
