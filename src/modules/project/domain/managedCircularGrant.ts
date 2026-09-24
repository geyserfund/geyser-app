import { ProjectFundingStrategy } from '@/types/index.ts'

export const MANAGED_CIRCULAR_GRANT_MAX_TARGET_SATS = 1_000_000_000
export const MANAGED_CIRCULAR_GRANT_GOAL_TITLE = 'Circular Grant Goal'

export const isManagedCircularGrantProject = (project: {
  isCircularGrant?: boolean | null
  fundingStrategy?: ProjectFundingStrategy | null
}) => Boolean(project.isCircularGrant && project.fundingStrategy === ProjectFundingStrategy.TakeItAll)

/** Unlaunched Take-it-all projects that are not Circular Grants. */
export const isOpenFundingCreationProject = (project: {
  isCircularGrant?: boolean | null
  fundingStrategy?: ProjectFundingStrategy | null
  launchedAt?: string | number | null
}) =>
  project.fundingStrategy === ProjectFundingStrategy.TakeItAll && !project.isCircularGrant && !project.launchedAt

export const canCreateManagedCircularGrant = (isFieldPartner: boolean) => isFieldPartner
