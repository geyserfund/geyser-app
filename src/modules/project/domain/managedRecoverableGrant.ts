import { ProjectFundingStrategy } from '@/types/index.ts'

export const MANAGED_RECOVERABLE_GRANT_MAX_TARGET_SATS = 1_000_000_000
export const MANAGED_RECOVERABLE_GRANT_GOAL_TITLE = 'Recoverable Grant Goal'

export const isManagedRecoverableGrantProject = (project: {
  isRecoverableGrant?: boolean | null
  fundingStrategy?: ProjectFundingStrategy | null
}) => Boolean(project.isRecoverableGrant && project.fundingStrategy === ProjectFundingStrategy.TakeItAll)

export const canCreateManagedRecoverableGrant = (isFieldPartner: boolean) => isFieldPartner
