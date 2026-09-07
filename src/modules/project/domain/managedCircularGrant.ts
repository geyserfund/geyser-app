import { ProjectFundingStrategy } from '@/types/index.ts'

export const MANAGED_CIRCULAR_GRANT_MAX_TARGET_SATS = 1_000_000_000
export const MANAGED_CIRCULAR_GRANT_GOAL_TITLE = 'Circular Grant Goal'

export const isManagedCircularGrantProject = (project: {
  isCircularGrant?: boolean | null
  fundingStrategy?: ProjectFundingStrategy | null
}) => Boolean(project.isCircularGrant && project.fundingStrategy === ProjectFundingStrategy.TakeItAll)

export const canCreateManagedCircularGrant = (isFieldPartner: boolean) => isFieldPartner
